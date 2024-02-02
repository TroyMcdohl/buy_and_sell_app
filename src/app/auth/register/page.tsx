"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingCart from "@/app/components/User/LoadingCart";

enum InputKind {
  NAME = "NAME",
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  CONFIRM_PASSWORD = "CONFIRM_PASSWORD",
  PH_NUM = "PH_NUM",
}

const page = () => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    ph_num: 0,
  });

  const changeFunction = (type: InputKind, payload: string | number | any) => {
    switch (type) {
      case InputKind.NAME:
        setData((prev) => {
          return { ...prev, name: payload };
        });
        break;

      case InputKind.EMAIL:
        setData((prev) => {
          return { ...prev, email: payload };
        });
        break;

      case InputKind.PH_NUM:
        setData((prev) => {
          return { ...prev, ph_num: payload };
        });
        break;

      case InputKind.PASSWORD:
        setData((prev) => {
          return { ...prev, password: payload };
        });
        break;
      case InputKind.CONFIRM_PASSWORD:
        setData((prev) => {
          return { ...prev, confirm_password: payload };
        });

        break;

      default:
        return data;
    }
  };

  const changeHandler = (
    inputType: InputKind,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    changeFunction(inputType, e.target.value);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://buy-and-sell-app-api.vercel.app/api/v1/users/register",
        {
          name: data.name,
          email: data.email,
          ph_num: data.ph_num,
          password: data.password,
          confirm_password: data.confirm_password,
        },
        {
          withCredentials: true,
        }
      );

      setLoading(false);

      router.replace("/auth/login");
    } catch (error: any) {
      setLoading(false);
      setErrMsg(error.response.data.message);
      setTimeout(() => {
        setErrMsg("");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center    items-center h-screen w-screen">
      <div className="flex sm:flex-row  flex-col justify-center items-center h-[100%] p-2  sm:h-[80%] w-[90%] sm:w-[40%] shadow-xl">
        <div className="sm:w-1/2 w-[80%] h-[80%] ">
          <Image
            alt="photo"
            width={500}
            height={500}
            className="object-cover mx-auto w-[90%] h-full "
            src="https://source.unsplash.com/black-laptop-computer-on-brown-wooden-table-3S0INpfREQc"
          />
        </div>
        <form onSubmit={submitHandler} className="sm:w-1/2 w-[90%] ">
          {errMsg && (
            <div className=" w-full mx-auto text-center text-red-500  ">
              {errMsg}
            </div>
          )}
          <h4 className="text-2xl sm:p-0 p-2 font-bold text-center">
            Register
          </h4>
          <div className="mt-5 flex flex-col justify-center items-center w-full">
            <label
              htmlFor=""
              className="font-lg text-lg flex justify-start w-1/2 "
            >
              Name
            </label>
            <input
              type="text"
              placeholder="example"
              className=" mt-2 w-1/2 p-2 outline-none border-b-2 border-blue-00"
              onChange={changeHandler.bind(this, InputKind.NAME)}
            />
          </div>
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
              onChange={changeHandler.bind(this, InputKind.EMAIL)}
            />
          </div>
          <div className="mt-5 flex flex-col justify-center items-center w-full">
            <label
              htmlFor=""
              className="font-lg text-lg flex justify-start w-1/2 "
            >
              Phone Number
            </label>
            <input
              type="number"
              placeholder="09*********"
              className=" mt-2 w-1/2 p-2 outline-none border-b-2 border-blue-00"
              onChange={changeHandler.bind(this, InputKind.PH_NUM)}
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
              onChange={changeHandler.bind(this, InputKind.PASSWORD)}
            />
          </div>

          <div className="  mt-5 flex flex-col justify-center items-center w-full">
            <label
              htmlFor=""
              className="font-lg  flex justify-start w-1/2 text-lg"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="********"
              className=" mt-2  outline-none w-1/2 p-2 border-b-2 border-blue-00"
              onChange={changeHandler.bind(this, InputKind.CONFIRM_PASSWORD)}
            />
          </div>

          <div className=" mt-5 flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className="text-white rounded-lg hover:cursor-pointer flex justify-start px-5 py-2 bg-blue-600"
              disabled={loading}
            >
              {loading ? <LoadingCart /> : "Register"}
            </button>
          </div>

          <div className="text-center mt-5 sm:p-0 p-2">
            <p className="inline mx-1">Already have an account</p>
            <Link href="/auth/login">
              <b className="mx-1 underline text-blue-500 hover:cursor-pointer">
                login
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
