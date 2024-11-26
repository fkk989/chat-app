import { DropdownMenu } from "./Dropdown";
import React, { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { clsx } from "clsx";
import LogoutBtn from "../buttons/LogoutBtn";
import { useChatPanle } from "@/context/ChatPanelContext";

export const AllChatMoreOption: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { setSelectedTab } = useChatPanle();
  return (
    <DropdownMenu.Root
      isOpen={open}
      setIsOpen={setOpen}
      className={"flex flex-col justify-center cursor-pointer"}
    >
      <div className="relative h-[55px] flex justify-center">
        <DropdownMenu.Trigger>
          <div
            className={clsx(
              "w-[40px] h-[40px] flex items-center justify-center rounded-full",
              open && "bg-[#ffffff24]"
            )}
          >
            <IoMdMore className="text-[30px] text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="absolute right-0 top-[50px] origin-top-right">
          <ul className="w-[200px] flex flex-col  items-center  bg-[#2A3942] rounded-sm shadow-xl">
            <li
              onClick={() => {
                setOpen(false);
                setSelectedTab("profile");
              }}
              className="w-full hover:bg-black px-[20px] py-[10px] text-white"
            >
              Profile
            </li>
            <li
              onClick={() => {
                setOpen(false);
                setSelectedTab("create-group");
              }}
              className="w-full hover:bg-black px-[20px] py-[10px] text-white"
            >
              Create group
            </li>
            <li className="w-full hover:bg-black px-[20px] py-[10px]">
              <LogoutBtn />
            </li>
          </ul>
        </DropdownMenu.Content>
      </div>
    </DropdownMenu.Root>
  );
};
