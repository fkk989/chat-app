import { Chatpanel } from "@/components/chat-panel";
import { ChatPanelContextProvider } from "@/context/ChatPanelContext";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#0C1318] p-[20px]">
      <Chatpanel />
    </div>
  );
}
