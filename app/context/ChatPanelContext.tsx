"use client";
import { ChatResponse, RoomResponse } from "@/utils/types";
import { createContext, useContext, useState } from "react";

type Tabs = "chats" | "profile";

export type Room = RoomResponse["rooms"][number];

export interface ChatPanelContextProp {
  search: string;
  setSearch: React.Dispatch<
    React.SetStateAction<ChatPanelContextProp["search"]>
  >;
  latestMessages: { [roomId: string]: string };
  setLatestMessages: React.Dispatch<
    React.SetStateAction<ChatPanelContextProp["latestMessages"]>
  >;
  unreadMessages: { [roomId: string]: string[] | null };
  setUnreadMessages: React.Dispatch<
    React.SetStateAction<ChatPanelContextProp["unreadMessages"]>
  >;
  temporaryRoom: { userID: string; name: string; email: string } | null;
  setTemporaryRoom: React.Dispatch<
    React.SetStateAction<ChatPanelContextProp["temporaryRoom"]>
  >;
  rooms: Room[] | null;
  setRooms: React.Dispatch<React.SetStateAction<ChatPanelContextProp["rooms"]>>;
  roomMessages: ChatResponse[];
  setRoomMessages: React.Dispatch<
    React.SetStateAction<ChatPanelContextProp["roomMessages"]>
  >;
  selectedRoom: {
    id: number;
    name: string;
    isGroupChat: boolean;
  } | null;
  setSelectedRoom: React.Dispatch<
    React.SetStateAction<ChatPanelContextProp["selectedRoom"]>
  >;
  selectedUser: {
    id: string;
    name: string;
    email: string;
  } | null;
  setSelectedUser: React.Dispatch<
    React.SetStateAction<ChatPanelContextProp["selectedUser"]>
  >;
  selectedTab: Tabs;
  setSelectedTab: React.Dispatch<
    React.SetStateAction<ChatPanelContextProp["selectedTab"]>
  >;
}
const ChatPanelContext = createContext<ChatPanelContextProp | null>(null);

export const ChatPanelContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //
  const [search, setSearch] = useState("");
  const [temporaryRoom, setTemporaryRoom] =
    useState<ChatPanelContextProp["temporaryRoom"]>(null);
  const [rooms, setRooms] = useState<ChatPanelContextProp["rooms"]>(null);
  const [roomMessages, setRoomMessages] = useState<
    ChatPanelContextProp["roomMessages"]
  >([]);
  const [selectedRoom, setSelectedRoom] =
    useState<ChatPanelContextProp["selectedRoom"]>(null);
  const [selectedUser, setSelectedUser] =
    useState<ChatPanelContextProp["selectedUser"]>(null);
  const [selectedTab, setSelectedTab] =
    useState<ChatPanelContextProp["selectedTab"]>("chats");
  const [latestMessages, setLatestMessages] = useState<
    ChatPanelContextProp["latestMessages"]
  >({});
  const [unreadMessages, setUnreadMessages] = useState<
    ChatPanelContextProp["unreadMessages"]
  >({});
  //
  if (rooms) {
    rooms[0];
  }
  return (
    <ChatPanelContext.Provider
      value={{
        search,
        setSearch,
        temporaryRoom,
        setTemporaryRoom,
        rooms,
        setRooms,
        roomMessages,
        setRoomMessages,
        selectedRoom,
        setSelectedRoom,
        selectedUser,
        setSelectedUser,
        selectedTab,
        setSelectedTab,
        latestMessages,
        setLatestMessages,
        unreadMessages,
        setUnreadMessages,
      }}
    >
      {children}
    </ChatPanelContext.Provider>
  );
};

export const useChatPanle = () => {
  const context = useContext(ChatPanelContext)!;
  return context;
};
