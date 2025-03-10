import { LinkButton } from "@/components/buttons";
import { SignUpForm } from "@/components/form";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IoIosCheckmark } from "react-icons/io";
//
const Signup = async () => {
  //
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/");
  //
  return (
    <div className="w-screen h-screen mb-[50px] ">
      {/* app bar */}
      <div className="sticky top-0 flex items-center justify-between w-screem h-[70px] border-b-[1px] border-[#dfddd2] px-[10px] mobile:px-[100px] bg-white">
        <h1 className="text-[25px] font-bold">Chit Chat</h1>
        <LinkButton
          title="Login"
          href="/login"
          className="w-[100px] h-[40px] rounded-md bg-[#4284F3] hover:bg-[#6293e9] text-white font-bold"
        />
      </div>
      {/* form */}
      <div className="w-screen flex items-center justify-center mt-[50px]  ">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Signup;
