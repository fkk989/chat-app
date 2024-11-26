"use client";
import React, { useEffect } from "react";
import { Sidebar } from "../Sidebar";
import { ChatRoomsSection } from "./ChatRoomsSection";
import { Chats } from "./Chats";
import { ChatPanelContextProp, useChatPanle } from "@/context/ChatPanelContext";
import { Profile } from "../tabs";
import CreateGroup from "../tabs/CreateGroup";

function showSelectedTab(selectedTab: ChatPanelContextProp["selectedTab"]) {
  switch (selectedTab) {
    case "chats":
      return <ChatRoomsSection />;
    case "profile":
      return <Profile />;
    case "create-group":
      return <CreateGroup />;
  }
}
export const MobileChatpanel = () => {
  const { selectedUser, selectedRoom, selectedTab } = useChatPanle();

  return (
    <div className="mobile:hidden w-full h-full flex ">
      {/* side bar */}
      {/* {(!selectedUser || !selectedRoom) && <Sidebar />} */}
      {/* all friends */}
      {selectedUser || selectedRoom ? <Chats /> : showSelectedTab(selectedTab)}
    </div>
  );
};
