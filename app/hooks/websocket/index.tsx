import { ChatPanelContextProp, useChatPanle } from "@/context/ChatPanelContext";
import { ChatResponse, MessageType, Payload } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  addMessageToDb,
  useSetLatestMessage,
  useSetUnreadMessage,
} from "../chats";
import { debounce } from "../user";

// prduction
// const WEB_SOCKET_URL = "wss://highly-scaleable-chat-app-1.onrender.com";
// dev
const WEB_SOCKET_URL = "ws://localhost:8000";

// this function will put the room with latest message on top
export function reshuffleRooms({
  roomId,
  rooms,
  setRooms,
}: {
  roomId: number;
  rooms: ChatPanelContextProp["rooms"];
  setRooms: ChatPanelContextProp["setRooms"];
}) {
  if (!rooms) return;
  if (rooms[0].id === roomId) {
    return;
  }
  const roomToPutOnTop = rooms.filter(({ id }) => roomId === id)[0];

  setRooms((currentRoom) => {
    // first filter out the room
    if (!currentRoom) return null;

    const filterdRoom = currentRoom.filter(({ id }) => roomId !== id);
    // then add it to the top
    const newRoom =
      filterdRoom.length > 0 ? [roomToPutOnTop, ...filterdRoom] : currentRoom;

    return newRoom;
  });
}

export function useWebSocket({ roomId }: { roomId?: number }) {
  //
  const { addUnreadMessage, updateMessageStatus } = useSetUnreadMessage();
  const { data: sessionData } = useSession();
  const { selectedRoom, selectedUser, setRooms, rooms, setRoomMessages } =
    useChatPanle();
  const { updateLatestMessage } = useSetLatestMessage();
  //
  useEffect(() => {
    if (sessionData && roomId) {
      // Only connect when session data is available
      const socket = new WebSocket(WEB_SOCKET_URL);

      socket.onopen = () => {
        console.log("websocket connected to", roomId);
        socket.send(
          JSON.stringify({
            type: "join",
            payload: {
              userId: sessionData.user.userId,
              roomId: `${roomId}`,
            },
          })
        );
      };

      // Handle WebSocket message event
      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data) as {
          message: string;
          userId: string;
          roomId: string;
          messageId: string;
          createdAt: Date;
          userName: string;
        };

        const tempMessageObj: ChatResponse = {
          id: data.messageId,
          roomId: parseInt(data.roomId),
          content: data.message,
          createdAt: data.createdAt,
          updatedAt: data.createdAt,
          userId: data.userId,
          user: {
            name: data.userName,
          },
          readBy: [],
        };

        reshuffleRooms({ roomId, rooms, setRooms });
        //TODO:SET LATEST MESSAGE

        updateLatestMessage(`${roomId}`, tempMessageObj);

        if (selectedRoom && selectedRoom.id === roomId) {
          setRoomMessages((currentMessages) => {
            const updatedMessages = [...currentMessages, tempMessageObj];
            return updatedMessages;
          });
        }
        // message
        if (
          selectedRoom &&
          selectedRoom.id === roomId &&
          data.userId !== sessionData.user.userId
        ) {
          // updating message status to as as room is selected
          updateMessageStatus(roomId, data.messageId);
          const message = new Audio("/message.mp3");
          await message.play().catch((e) => {
            console.error("Error playing sound:", e);
          });
        }

        // notification
        if (selectedRoom && selectedRoom.id !== roomId) {
          //  Icrementing the unread message count
          addUnreadMessage({ messageId: data.messageId, roomId: `${roomId}` });
          const notificationSound = new Audio("/notification.mp3");
          await notificationSound.play().catch((e) => {
            console.error("Error playing sound:", e);
          });
        }
        //
        if (!selectedRoom) {
          //  add unread message
          addUnreadMessage({ messageId: data.messageId, roomId: data.roomId });
        }
      };

      // Handle WebSocket errors
      socket.onerror = (error) => {
        // console.error("WebSocket error:", error);
      };

      // Clean up on unmount
      return () => {
        socket.close();
        // console.log("WebSocket closed", roomId);
      };
    }
  }, [sessionData, selectedRoom, selectedUser]);
}

//send message
export const useSendMessage = (roomId?: number) => {
  const { data: sessionData } = useSession();
  const { isFriendTyping, selectedRoom } = useChatPanle();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const messageQueue = useRef<
    {
      type: string;
      payload: {
        roomId: string;
        userId: string;
        userName: string;
        message: string;
        messageId?: string;
      };
    }[]
  >([]); // Queue for messages

  useEffect(() => {
    if (sessionData && roomId) {
      // Only connect when session data is available
      const socketConnection = new WebSocket(WEB_SOCKET_URL);

      socketConnection.onopen = () => {
        //
        setIsConnected(true);
        setSocket(socketConnection);

        // console.log("room chat connected with:", roomId);
        socketConnection.send(
          JSON.stringify({
            type: "join",
            payload: {
              userId: sessionData.user.userId,
              roomId: `${roomId}`,
            },
          })
        );

        // send message from the queue
        while (messageQueue.current.length > 0) {
          const message = messageQueue.current.shift();

          socketConnection.send(JSON.stringify(message));
        }
      };

      // Handle WebSocket errors
      socketConnection.onerror = (error) => {
        // console.error("WebSocket error:", error);
        setIsConnected(false);
        setSocket(null);
      };
      // Clean up on unmount
      return () => {
        socketConnection.close();
        // console.log("WebSocket closed", roomId);
        setIsConnected(false);
        setSocket(null);
      };
    }
  }, [roomId]);

  const handleSendMessage = async (
    payload: Omit<Payload<"message">, "userId">
  ) => {
    if (!sessionData) {
      return toast.error("Not loged in");
    }

    const messageRespones = await addMessageToDb(
      payload.message,
      parseInt(payload.roomId)
    );

    if (!socket || !isConnected) {
      messageQueue.current.push({
        type: "message",
        payload: {
          roomId: payload.roomId,
          userId: sessionData.user.userId,
          userName: sessionData.user.name,
          message: payload.message,
          messageId: messageRespones!.createdMessage.id,
        },
      });

      return;
    }
    socket.send(
      JSON.stringify({
        type: "message",
        payload: {
          ...payload,
          messageId: messageRespones!.createdMessage.id,
          userId: sessionData.user.userId,
          userName: sessionData.user.name,
        },
      })
    );
  };

  const sendMessage = useCallback(handleSendMessage, [
    roomId,
    socket,
    isConnected,
  ]);

  const handleSendTypingNotifiction = () => {
    if (!sessionData) {
      toast.error("Not loged in");
      return;
    }

    if (!socket || !isConnected || !selectedRoom) {
      return;
    }
    if (isFriendTyping[`${selectedRoom.id}`]) {
      socket.send(
        JSON.stringify({
          type: "typing",
          payload: {
            roomId,
            userId: sessionData.user.userId,
          },
        })
      );
    }

    debounce((roomId: string) => {
      socket.send(
        JSON.stringify({
          type: "no-typing",
          payload: {
            roomId,
            userId: sessionData.user.userId,
          },
        })
      );
    }, 1000)(`${selectedRoom.id}`);
  };

  const sendTypingNotification = useCallback(handleSendTypingNotifiction, [
    roomId,
    socket,
    isConnected,
  ]);

  return { sendMessage, sendTypingNotification };
};
