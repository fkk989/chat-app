import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { useChatPanle } from "@/context/ChatPanelContext";
import { PiWechatLogoLight, PiWechatLogoFill } from "react-icons/pi";
import clsx from "clsx";

//
export const Sidebar = () => {
  //
  const { selectedTab, setSelectedTab } = useChatPanle();
  //

  return (
    <div className="max-mobile:fixed max-mobile:gap-[50px] bottom-0 w-full h-[50px]  mobile:w-[110px] mobile:h-full flex items-center  mobile:flex-col justify-center mobile:justify-between  bg-[#1F2C33]">
      <div
        onClick={() => {
          setSelectedTab("chats");
        }}
        className={clsx(
          "mobile:mt-[40px] w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer",
          selectedTab === "chats" ? "bg-[#ffffff24]" : "hover:bg-[#ffffff4e]"
        )}
      >
        {selectedTab === "chats" ? (
          <PiWechatLogoFill className="text-[25px] text-white" />
        ) : (
          <PiWechatLogoLight className="text-[25px] text-white" />
        )}
      </div>
      <div className="mobile:hidden w-[2px] h-[80%] bg-gray-400"></div>
      <div
        onClick={() => {
          setSelectedTab("profile");
        }}
        className={clsx(
          "relative mobile:mb-[30px] w-[40px] h-[40px] flex justify-center items-end rounded-full overflow-hidden bg-[#697175] cursor-pointer",
          selectedTab === "profile" && "border-[3px] border-gray-400"
        )}
      >
        <BiSolidUser className="absolute bottom-[-5px] text-[35px] text-white" />
      </div>
    </div>
  );
};
