"use client";
import { Room, useChatPanle } from "@/context/ChatPanelContext";
import { useSendMessage } from "@/hooks/websocket";

import React, { useCallback, useEffect, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import MessageInput from "./MessageInput";
import { useCreateRoom, useGetRoomChats } from "@/hooks";
import toast from "react-hot-toast";
import { MessageCards } from "./MessageCards";

export const Chats = () => {
  //
  const [input, setInput] = useState("");
  const { selectedUser, selectedRoom, unreadMessages } = useChatPanle();
  //
  const { sendMessage } = useSendMessage(selectedRoom?.id);

  const { mutation: createRoomMutation } = useCreateRoom();
  //

  const {
    query,
    messages: roomMessages,
    setMessages,
  } = useGetRoomChats(selectedRoom?.id);

  useEffect(() => {
    console.log(unreadMessages[`${selectedRoom?.id}`]);
    if (roomMessages) {
      console.log("Room message", roomMessages);
    }
  }, [roomMessages, unreadMessages]);

  useEffect(() => {
    if (!selectedRoom) {
      setMessages([]);
    }
    if (selectedRoom) {
      query.refetch();
    }
  }, [selectedRoom]);

  //
  const handleSendMessage = useCallback(() => {
    if (!input) {
      return toast.error("please type something", { id: "nothing-typed" });
    }
    // if no roomId is selected than user is sending message to a new friend so create a room for them than send message
    if (selectedRoom && selectedRoom.id) {
      sendMessage({
        message: input,
        roomId: `${selectedRoom.id}`,
      });
    } else {
      if (selectedUser)
        createRoomMutation.mutate({ friendId: selectedUser.id, input });
    }
    setInput("");
  }, [selectedUser, selectedRoom, input]);

  //
  return (
    <div className=" relative w-full h-full overflow-hidden ">
      {/* topbar */}

      <div className=" absolute top-0 w-full h-[60px] flex  items-center justify-between  bg-[#1F2C33] pl-[20px] pr-[20px]">
        <div className="flex items-center gap-[20px]">
          {/* profile pic */}
          <div
            className={
              "relative w-[40px] h-[40px] flex justify-center items-end rounded-full overflow-hidden bg-[#697175] cursor-pointer"
            }
          >
            <BiSolidUser className="absolute bottom-[-5px] text-[35px] text-white" />
          </div>
          {/* name */}
          <h2 className="text-white font-bold">
            {(selectedRoom && selectedRoom.name) ||
              (selectedUser && selectedUser.name.split(" ")[0])}
          </h2>
        </div>
      </div>

      {/* chats*/}
      <div
        className="w-full h-full flex flex-col  justify-end gap-[10px]  bg-[#0c1318f0] bg-blend-multiply bg-repeat overflow-scroll py-[80px] px-[30px]"
        style={{
          backgroundImage: "url('/chat-bg.png')",
          backgroundSize: "calc(100%/3)",
        }}
      >
        {roomMessages.map((prop) => {
          return <MessageCards {...{ ...prop }} />;
        })}
      </div>
      {/* input bar */}
      <div className="absolute bottom-0 w-full h-[70px] flex items-center justify-center bg-[#1F2C33]">
        {/* input  */}
        <MessageInput
          input={input}
          setInput={setInput}
          onSubmit={handleSendMessage}
        />
      </div>
    </div>
  );
};
