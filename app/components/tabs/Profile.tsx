import { useSession } from "next-auth/react";
import React from "react";
import LogoutBtn from "../buttons/LogoutBtn";

export const Profile = () => {
  const { data: sessionData } = useSession();
  if (!sessionData) return <></>;
  return (
    <div className="w-[45%] h-full flex flex-col bg-[#111B21] border-l-[1px] border-r-[1px] border-[#ffffff30] px-[30px] ">
      <div className="flex items-center justify-between  mt-[20px]">
        <h1 className="text-[25px] text-white font-bold">Profile</h1>
      </div>
      {/* inofo */}
      <div className="flex flex-col gap-[10px] text-[#008069] mt-[50px]">
        {/* name */}
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[14px] font-[500]">Your name</h1>
          <h3 className="text-[20px] text-white capitalize">
            {sessionData.user.name}
          </h3>
        </div>
        {/* email */}
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[14px] font-[500]">Your email</h1>
          <h3 className="text-[18px] text-white capitalize">
            {sessionData.user.email}
          </h3>
        </div>
        {/* logout button  */}
        <div className="mt-[20px]">
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
};
