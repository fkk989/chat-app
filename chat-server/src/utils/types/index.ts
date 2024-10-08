import WebSocket from "ws";

export type MessageType = "join" | "message";

export type Payload<T extends MessageType> = T extends "join"
  ? { userId: string; roomId: string }
  : Payload<"join"> & { message: string; messageId: string };

export interface CustomWebSocket extends WebSocket {
  roomId: string;
  userId: string;
}
