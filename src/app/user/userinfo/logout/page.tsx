"use client";
import UserSlide from "@/app/components/User/UserSlide";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    const res = await axios.patch(
      "http://localhost:8000/api/v1/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    router.replace("/user/products");
    router.refresh();
    localStorage.removeItem("user");
  };
  return (
    <>
      <div className="w-screen mx-auto h-[calc(100vh-60px)] flex justify-center items-center flex-col">
        <div className="sm:w-[50%] w-[90%] sm:h-[50%] h-[40%] shadow-lg flex justify-around items-center flex-col">
          <div className="text-2xl font-bold flex justify-center items-center text-white h-[20%] bg-gray-500 w-full">
            Logout Your Account
          </div>
          <div className="flex justify-center items-center h-[70%] sm:w-full w-1/2 text-xl font-semibold">
            Are you sure to log out your account?
          </div>
          <div className="h-[20%] flex items-center justify-between w-[50%]">
            <div
              onClick={logoutHandler}
              className=" w-1/3 h-1/2 flex justify-center items-center  bg-green-400 text-white"
            >
              Yes
            </div>
            <div
              onClick={() => {
                router.back();
              }}
              className=" w-1/3 h-1/2 flex justify-center items-center  bg-red-400 text-white"
            >
              No
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
