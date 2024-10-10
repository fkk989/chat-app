"use client";
import React, {
  createContext,
  CSSProperties,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClickOutside } from "@/hooks/userClickOutside";
import { restrictChildrenType } from "@/utils/helpers/restrictChildrenType";
import clsx from "clsx";

const DropdownMenuContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
} | null>(null);

const Root: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ children, className, style, isOpen, setIsOpen }) => {
  //
  const toggle = () => setIsOpen((crnt) => !crnt);
  const close = () => setIsOpen(false);
  //
  const { ref } = useClickOutside(close);
  return (
    <DropdownMenuContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

const Trigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { toggle } = useContext(DropdownMenuContext)!;
  restrictChildrenType(
    "button",
    children,
    "please dont put button inside DropdownMenu.trigger as DropdownMenu.Trigger is already a button and a button cannot be decendant of button"
  );
  return (
    <button
      className={className}
      onClick={toggle}
      style={{ backgroundColor: "transparent" }}
    >
      {children}
    </button>
  );
};

const Content: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ children, className, style }) => {
  const { isOpen } = useContext(DropdownMenuContext)!;

  return (
    <div
      style={style}
      className={clsx(
        className,
        "transition-all duration-[400] ease-out origin-top-right",
        isOpen ? "scale-[1]" : "scale-0"
      )}
    >
      {children}
    </div>
  );
};

export const DropdownMenu = {
  Root,
  Trigger,
  Content,
  context: DropdownMenuContext,
};
