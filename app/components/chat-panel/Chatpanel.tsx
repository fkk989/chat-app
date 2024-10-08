"use client";
import React, { useEffect } from "react";
import { Sidebar } from "../Sidebar";
import { ChatRoomsSection } from "./ChatRoomsSection";
import { Chats } from "./Chats";
import { useChatPanle } from "@/context/ChatPanelContext";

export const Chatpanel = () => {
  const { selectedUser, selectedRoom } = useChatPanle();
  useEffect(() => {});
  return (
    <div className="w-full h-full flex">
      {/* side bar */}
      <Sidebar />
      {/* all friends */}
      <ChatRoomsSection />
      {/* chats messages */}
      {selectedUser || selectedRoom ? (
        <Chats />
      ) : (
        <div className="w-full h-full flex justify-center items-center bg-[#1F2C33]">
          <h1 className=" text-white text-[40px] font-bold">
            Starts your chit chats
          </h1>
        </div>
      )}
    </div>
  );
};
