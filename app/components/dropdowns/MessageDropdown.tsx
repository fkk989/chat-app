import { DropdownMenu } from "./Dropdown";
import React, { useState } from "react";
import { clsx } from "clsx";
import LogoutBtn from "../buttons/LogoutBtn";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export type DropdownPosition = "left" | "right" | "top-left" | "top-right";

export const MessageDropdown = ({
  position,
}: {
  position: DropdownPosition;
}) => {
  const [open, setOpen] = useState(false);
  console.log("position: ", position);
  return (
    <DropdownMenu.Root
      isOpen={open}
      setIsOpen={setOpen}
      className={"flex flex-col justify-center cursor-pointer"}
    >
      <div className="absolute right-0">
        <div className="relative h-[55px] flex justify-center">
          <DropdownMenu.Trigger className=" scale-0 group-hover:scale-[1] translate-x-[50%] group-hover:translate-x-0 transition-all duration-200 ease-out">
            <MdOutlineKeyboardArrowDown
              className={clsx(
                "text-[30px] text-gray-400 hover:text-white cursor-pointer rotate-0 transition-all duration-300 ease-out",
                open && "rotate-[-180deg]"
              )}
            />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            className={clsx(
              "absolute",
              position === "right"
                ? "right-0 top-[35px] translate-x-[90%] origin-top-left"
                : position === "left"
                ? "left-0 top-[35px] translate-x-[-90%] origin-top-right"
                : position === "top-left"
                ? "left-0 translate-y-[-80%]  translate-x-[-90%] origin-bottom-right "
                : "right-0   translate-y-[-80%]  translate-x-[90%] origin-bottom-left"
            )}
          >
            <ul className="w-[200px] bg-[#2A3942] justify-center py-[5px] ">
              <li
                onClick={() => {
                  setOpen(false);
                }}
                className="w-full h-[30px] flex items-center pl-[10px] hover:bg-[#111B21]"
              >
                Delete
              </li>
            </ul>
          </DropdownMenu.Content>
        </div>
      </div>
    </DropdownMenu.Root>
  );
};
