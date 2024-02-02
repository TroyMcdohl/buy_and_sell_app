"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import LoadingCart from "./LoadingCart";
import { useRouter } from "next/navigation";

type props = {
  review: any;
  productId: string;
};

const ReviewOne = (props: props) => {
  const data =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user")!);

  const user = data;
  const router = useRouter();
  const [hltag, setHltag] = useState(false);
  const [loading, setLoading] = useState(false);

  const clickHandler = () => {
    setHltag(true);
  };

  const deleteHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `https://buy-and-sell-app-api.vercel.app/api/v1/products/${props.productId}/rating/${props.review._id}`,

        {
          withCredentials: true,
        }
      );

      setHltag(false);
      setLoading(false);
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      setHltag(false);
      console.log(error.repsonse.data.message);
    }
  };

  return (
    <>
      {hltag && (
        <div className=" absolute bg-slate-400   h-[250px] w-[380px]">
          <div className="font-bold bg-red-500  text-white h-[20%] flex justify-center items-center">
            Delete Comment
          </div>
          <div className="h-[50%] flex  justify-center items-center text-white">
            Are you sure want to delete your comment?
          </div>
          <div className="h-[30%] flex justify-around items-center">
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-md"
              onClick={deleteHandler}
              disabled={loading}
            >
              {loading ? <LoadingCart /> : "Yes"}
            </button>
            <button
              onClick={() => {
                setHltag(false);
              }}
              className="px-6 py-2 bg-gray-500 text-white rounded-md"
            >
              No
            </button>
          </div>
        </div>
      )}
      <div
        className="w-full  my-2 hover:bg-gray-300 "
        onClick={
          user?._id == props.review.user._id
            ? clickHandler
            : () => console.log("")
        }
      >
        <div className="flex items-center">
          <Image
            src={`https://buy-and-sell-app-api.vercel.app/public/img/users/${props.review.user.photo}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full mx-2"
            width={50}
            height={50}
          />
          <h6>{props.review.user.name}</h6>
        </div>
        <div className="text-sm p-2">{props.review.content}</div>
      </div>
    </>
  );
};

export default ReviewOne;
