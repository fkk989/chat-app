import { DropdownMenu } from "./Dropdown";
import React, { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { clsx } from "clsx";
import { signOut } from "next-auth/react";
import LogoutBtn from "../buttons/LogoutBtn";

export const MoreOptionsDropdown: React.FC = (prop) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root
      isOpen={open}
      setIsOpen={setOpen}
      className=" flex flex-col justify-center cursor-pointer h-[55px] z-10 "
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

        <DropdownMenu.Content className="absolute right-0 top-[60px]">
          <div className="w-[200px] py-[10px]   flex flex-col bg-[#233138] rounded-md shadow-xl px-[20px]">
            <LogoutBtn />
          </div>
        </DropdownMenu.Content>
      </div>
    </DropdownMenu.Root>
  );
};
