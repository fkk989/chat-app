import express from "express";
import cors from "cors";
import https from "http";
import { WebSocketServer } from "ws";
import { WebSocketService } from "../service/WebsocketService";
import { CustomWebSocket, MessageType, Payload } from "../utils/types";

const app = express();

app.use(cors(), express.json());

const httpServer = https.createServer(app);

const wss = new WebSocketServer({ server: httpServer });

const webSocketService = WebSocketService.getInstance();

wss.on("connection", (ws: CustomWebSocket, req) => {
  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString()) as {
        type: MessageType;
        payload: any;
      };

      if (parsedMessage.type === "join") {
        const { roomId, userId } = parsedMessage.payload as Payload<"join">;
        ws.roomId = roomId;
        ws.userId = userId;

        webSocketService.addUser({ roomId, userId, ws });
      }

      if (parsedMessage.type === "message") {
        const payload = parsedMessage.payload as Payload<"message">;
        webSocketService.publishMessage(payload);
      }
    } catch (e: any) {
      console.log("Error in on message", e);
    }
  });

  ws.on("close", (code) => {
    const roomId = ws.roomId;
    const userId = ws.userId;
    if (!roomId && !userId) return;
    console.log("roomId:", roomId, "userId:", userId);
    webSocketService.removeUser({ roomId, userId });
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: `server running fine`,
  });
});

export default httpServer;
