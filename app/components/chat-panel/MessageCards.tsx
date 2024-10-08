import { Room } from "@/context/ChatPanelContext";
import { ChatResponse } from "@/utils/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React from "react";

export const MessageCards: React.FC<ChatResponse> = (prop) => {
  const { data: sessionData } = useSession();
  if (!sessionData) return <></>;
  return (
    <div
      className={clsx(
        "w-full flex items-center",
        prop.userId === sessionData.user.userId && "justify-end"
      )}
    >
      <div
        className={clsx(
          " w-fit max-w-[60%] p-[10px] text-white rounded-md",
          prop.userId === sessionData.user.userId
            ? "bg-[#015C4B] right-[30px]"
            : "bg-[#1F2C33] left-[30px]"
        )}
      >
        {prop.content}
      </div>
    </div>
  );
};
