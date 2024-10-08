import { DateTime } from "next-auth/providers/kakao";

export type MessageType = "join" | "message";

export type Payload<T extends MessageType> = T extends "join"
  ? { userId: string; roomId: string }
  : Payload<"join"> & { message: string };

export type AuthType = "google" | "github" | "credentials";

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type User<T extends AuthType> = T extends "credentials"
  ? UserData
  : Omit<UserData, "password">;

export interface RoomResponse {
  success: boolean;
  message: string;
  rooms: {
    id?: number;
    name?: string;
    isGroupChat: boolean;
    createdAt?: DateTime;
    updatedAt?: DateTime;
    admins: {
      id: string;
      name: string;
      email: string;
    }[];
    users: {
      id: string;
      name: string;
      email: string;
    }[];
    chats: {
      id: string;
      createdAt?: Date;
      updatedAt?: Date;
      roomId: number;
      content: string;
      userId: string;
      readBy: string[];
    }[];
  }[];
}

export interface SearchResponse {
  success: boolean;
  message: string;
  users: {
    id: string;
    name: string;
    email: string;
  }[];
}
export interface ChatResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  userId: string;
  roomId: number;
}
