"use client";
import { Chatpanel } from "@/components/chat-panel";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  // as I am using free server for my chat service so it goes down when inactive for long period so it take time to boot up
  const checkForConnection = useCallback(async () => {
    try {
      //

      toast.loading(
        "booting up server can take few minutes for the first time",
        { id: "connecting to server" }
      );

      //
      const data = (
        await axios.get("https://chat-app-5sl1.onrender.com/health")
      ).data;

      if (data.success) {
        toast.success("Connected to server", { id: "connecting to server" });
      }
    } catch (error) {
      toast.error("error connecting to server", {
        id: "connecting to server",
      });
    }
  }, []);

  useEffect(() => {
    checkForConnection();
  }, []);
  return (
    <div className="w-screen h-screen bg-[#0C1318] p-[20px]">
      <Chatpanel />
    </div>
  );
}
