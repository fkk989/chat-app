"use client";
import { Room, useChatPanle } from "@/context/ChatPanelContext";
import { useSendMessage } from "@/hooks/websocket";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import MessageInput from "./MessageInput";
import { useCreateRoom, useGetRoomChats } from "@/hooks";
import toast from "react-hot-toast";
import { MessageCards } from "./MessageCards";

export const Chats = () => {
  //
  const [isTyping, setIsTyping] = useState(false);
  const messageBox = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const { selectedUser, selectedRoom, unreadMessages, latestMessages } =
    useChatPanle();
  //
  const { sendMessage, sendTypingNotification } = useSendMessage(
    selectedRoom?.id
  );

  const { mutation: createRoomMutation } = useCreateRoom();
  //

  const {
    query,
    messages: roomMessages,
    setMessages,
  } = useGetRoomChats(selectedRoom?.id);

  // Step 2: Scroll to the bottom of the chat when the component mounts or messages change
  const handleScrollBottoom = () => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  };
  useEffect(() => {
    handleScrollBottoom();
  }, [roomMessages, messageBox]);

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
    <div className="  w-full h-full flex flex-col  overflow-hidden ">
      {/* topbar */}

      <div className="  w-full h-[60px] flex  items-center justify-between  bg-[#1F2C33] pl-[20px] pr-[20px]">
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
        className="relative w-full h-[calc(100%-5px)]   items-center bg-[#0c1318f0] bg-blend-multiply overflow-hidden"
        style={{
          backgroundImage: "url('/chat-bg.png')",
          backgroundSize: "calc(100%/3)",
        }}
      >
        <div
          ref={messageBox}
          className="absolute bottom-0 w-full max-h-full flex flex-col gap-[8px] py-[20px]  items-center  overflow-y-scroll overflow-x-hidden"
        >
          {roomMessages.map((prop) => {
            return (
              <MessageCards
                key={prop.id}
                isGroupChat={selectedRoom?.isGroupChat}
                sendTypingNotification={sendTypingNotification}
                {...{ ...prop }}
              />
            );
          })}
        </div>
      </div>

      {/* input bar */}
      <div className=" w-full h-[70px] flex items-center justify-center bg-[#1F2C33]">
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
