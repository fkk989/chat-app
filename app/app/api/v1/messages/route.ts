import { authOptions } from "@/lib/auth";
import { generateResponse } from "@/utils/helpers";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { prisma } from "@/clients/db";
import { updateMessageStatusSchema } from "@/utils/schemas/messageSchema";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return generateResponse(400, false, "Not Authorized");
    }

    const roomId = req.nextUrl.searchParams.get("roomId");
    if (!roomId) {
      return generateResponse(400, false, "Please provide the room id");
    }

    const messages = await prisma.chat.findMany({
      where: { room: { id: parseInt(roomId) } },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return generateResponse(200, true, "fetched room messages successfully", {
      chats: messages,
    });
  } catch (e: any) {
    return generateResponse(400, false, e.message);
  }
};
//
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return generateResponse(400, false, "Not Authorized");
    }

    const { message, roomId } = await req.json();

    const createdMessage = await prisma.chat.create({
      data: {
        user: { connect: { id: session.user.userId } },
        room: { connect: { id: roomId } },
        readBy: {
          create: {
            user: { connect: { id: session.user.userId } },
          },
        },
        content: message,
      },
    });

    return generateResponse(200, true, "message created", {
      createdMessage,
    });
  } catch (e: any) {
    return generateResponse(400, false, e.message);
  }
};
//
// this will handle marking message staus to read
export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return generateResponse(400, false, "Not Authorized");
    }

    const reqBody = (await req.json()) as { messages: string[] };

    const parsedBody = updateMessageStatusSchema.safeParse(reqBody);
    // checking if all the types are correct
    if (!parsedBody.success) {
      return generateResponse(411, false, "invalid body", {
        errors: parsedBody.error.format(),
      });
    }

    const { messages } = parsedBody.data;

    const messagesToMarkRed = messages.map((chatId) => {
      return { chatId, userId: session.user.userId };
    });

    await prisma.messageReadReceipt.createMany({
      data: messagesToMarkRed,
      skipDuplicates: true,
    });

    return generateResponse(200, true, "messages status updated");
  } catch (e: any) {
    return generateResponse(400, false, e.message);
  }
};
