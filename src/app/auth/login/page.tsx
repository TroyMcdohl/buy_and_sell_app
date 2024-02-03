"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingCart from "@/app/components/User/LoadingCart";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(false);

  const changeHandler = (
    inputType: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (inputType == "email") {
      setEmail(e.target.value);
    } else if (inputType == "pwd") {
      setPwd(e.target.value);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "https://buy-and-sell-app-api.vercel.app/api/v1/users/login",
        {
          email,
          password: pwd,
        },
        {
          withCredentials: true,
        }
      );

      setLoading(false);
      const resData = await res;

      const userData = JSON.stringify(resData.data.user);

      localStorage.setItem("user", userData);

      router.replace("/user/products");
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      setErrMsg(error.response.data.message);
      setTimeout(() => {
        setErrMsg(undefined);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center   items-center h-screen w-screen">
      <div className="flex sm:flex-row  flex-col justify-center items-center h-[80%] sm:h-[60%] w-[90%] sm:w-[40%] shadow-xl">
        <div className="sm:w-1/2 w-[80%] h-[70%] ">
          <Image
            alt="photo"
            width={500}
            height={500}
            className="object-cover mx-auto w-[90%] h-full "
            src="https://source.unsplash.com/turned-off-macbook-pro-beside-white-ceramic-mug-filled-with-coffee-aOC7TSLb1o8"
          />
        </div>
        <form onSubmit={submitHandler} className="sm:w-1/2 w-[90%] ">
          {errMsg && (
            <div className=" w-full mx-auto text-center text-red-500  ">
              {errMsg}
            </div>
          )}
          <h4 className="text-2xl sm:p-0 p-2 font-bold text-center">Login</h4>
          <div className="mt-5 flex flex-col justify-center items-center w-full">
            <label
              htmlFor=""
              className="font-lg text-lg flex justify-start w-1/2 "
            >
              Email
            </label>
            <input
              type="text"
              placeholder="example@gmail.com"
              className=" mt-2 w-1/2 p-2 outline-none border-b-2 border-blue-00"
              name="email"
              onChange={changeHandler.bind(this, "email")}
            />
          </div>
          <div className="  mt-5 flex flex-col justify-center items-center w-full">
            <label
              htmlFor=""
              className="font-lg  flex justify-start w-1/2 text-lg"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className=" mt-2  outline-none w-1/2 p-2 border-b-2 border-blue-00"
              name="password"
              onChange={changeHandler.bind(this, "pwd")}
            />
          </div>

          <div className=" mt-5 flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className="text-white rounded-lg  flex justify-start px-5 py-2 bg-blue-600"
              disabled={loading}
            >
              {loading ? <LoadingCart /> : "Login"}
            </button>
          </div>

          <div className="text-center mt-5 sm:p-0 p-2">
            <Link href="/auth/forgotpassword">
              <b className=" underline mx-1 text-blue-500 hover:cursor-pointer">
                Forgot your password
              </b>
            </Link>
          </div>

          <div className="text-center mt-5 sm:p-0 p-2">
            <p className="inline mx-1">Don't have an account</p>
            <Link href="/auth/register">
              <b className=" underline mx-1 text-blue-500 hover:cursor-pointer">
                register
              </b>
            </Link>
            here
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
