"use client";
import UserSlide from "@/app/components/User/UserSlide";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

type propType = {
  params: {
    id: string;
  };
};

const Page = (props: propType) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const router = useRouter();

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (text.trim() == "") {
      setLoading(false);
      return setErr("Please fill your comment.");
    }
    try {
      const res = await axios.post(
        `https://buy-and-sell-app-api.vercel.app/api/v1/products/${props.params.id}/rating`,
        {
          content: text,
        },
        {
          withCredentials: true,
        }
      );

      setLoading(false);
      router.push(`/user/products/${props.params.id}`);
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      console.log(error.repsonse.data.message);
    }
  };

  return (
    <>
      <div className=" flex justify-between w-full items-center shadow-md h-[70px]">
        <div className="h-full w-full flex justify-start ms-5 items-center">
          {/* <FontAwesomeIcon
            icon={}
            className="w-[30px] h-[30px] mx-2"
          /> */}
          <span className="text-xl font-semibold">Product Information</span>
        </div>
        <div className="h-full w-full text-xl font-semibold me-5 flex justify-end items-center ">
          Product Detail
        </div>
      </div>

      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center h-[calc(100vh-190px)] w-[80%] mx-auto"
      >
        <textarea
          name=""
          placeholder="Add Your Comments"
          className=" border-2 p-2  w-[50%] h-1/2"
          id=""
          onChange={changeHandler}
        ></textarea>
        {err && <div className="text-center text-red-500">{err}</div>}
        <input
          type="submit"
          className=" cursor-pointer my-2 px-4 py-2 bg-green-500 text-white rounded-md"
          value="confirm"
          disabled={loading}
        />
      </form>
    </>
  );
};

export default Page;
