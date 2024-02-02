"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [oldPwd, setOldPwd] = useState<string>("");
  const [newPwd, setNewPwd] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (
    inputType: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (inputType == "newPwd") {
      setNewPwd(e.target.value);
    } else if (inputType == "pwd") {
      setPwd(e.target.value);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.patch(
        `https://buy-and-sell-app-api.vercel.app/api/v1/users/resetpassword/${params.id}`,
        {
          newPassword: newPwd,
          confirmPassword: pwd,
        },
        {
          withCredentials: true,
        }
      );

      setLoading(false);

      router.replace("/auth/login");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setErrMsg(error.response?.data?.message);
      setTimeout(() => {
        setErrMsg("");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center   items-center h-screen w-screen">
      <div className="flex sm:flex-row  flex-col justify-center items-center  h-[60%] w-[90%] sm:w-[40%] shadow-xl">
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
          <h4 className="text-2xl sm:p-0 p-2 font-bold text-center">
            Reset Password
          </h4>

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
              onChange={changeHandler.bind(this, "newPwd")}
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
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
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

export default page;
