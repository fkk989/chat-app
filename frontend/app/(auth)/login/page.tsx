import { LoginForm } from "@/components/form";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IoIosCheckmark } from "react-icons/io";
import Link from "next/link";
import { LinkButton } from "@/components/buttons";
//
const Login = async () => {
  //
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/");
  //
  return (
    <div className="w-screen ">
      {/* app bar */}
      <div className="sticky top-0 flex items-center justify-between w-screen h-[70px] border-b-[1px] border-[#dfddd2] px-[10px] mobile:px-[100px]">
        <h1 className="w-full text-[25px] font-bold">Chit Chat</h1>
        <LinkButton
          title="Sign Up"
          href="/signup"
          className="w-[100px] h-[40px] rounded-md bg-[#4284F3] hover:bg-[#6293e9] text-white font-bold"
        />
      </div>
      {/* content */}
      <div className="w-full  flex flex-col justify-center items-center mt-[20px] mobile:mt-[100px] ">
        {/* text info */}

        {/* form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
