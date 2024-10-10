import { Room } from "@/context/ChatPanelContext";
import { ChatResponse } from "@/utils/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React from "react";
import { TbTriangleFilled } from "react-icons/tb";
interface MessageCards extends ChatResponse {
  isGroupChat?: boolean;
  sendTypingNotification: () => void;
}

export const MessageCards: React.FC<MessageCards> = (prop) => {
  const { data: sessionData } = useSession();
  if (!sessionData) return <></>;

  return (
    <div
      className={clsx(
        "relative w-full flex items-center ",
        prop.userId === sessionData.user.userId && "justify-end"
      )}
    >
      {/* message box */}
      <div
        className={clsx(
          "relative w-fit max-w-[60%] p-[10px] text-white rounded-md",
          prop.userId === sessionData.user.userId
            ? "bg-[#015C4B] right-[30px] rounded-br-none"
            : "bg-[#1F2C33] left-[30px] rounded-tl-none"
        )}
      >
        {prop.isGroupChat && sessionData.user.userId !== prop.userId && (
          <p className="aboslute top-[3px] left-[4px] text-[13px] text-[#03CF9C]">
            {prop.user.name.split(" ")[0]}
          </p>
        )}
        <p>{prop.content}</p>
      </div>
    </div>
  );
};
