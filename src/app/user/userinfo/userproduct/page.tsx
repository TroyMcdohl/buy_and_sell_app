import React from "react";
import UserSlide from "../../../components/User/UserSlide";
import ProductCard from "../../../components/User/ProductCard";
import axios from "axios";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";

type productProp = {
  _id: string;
  name: string;
  price: number;
  photo: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  user: {
    name: string;
    photo: string;
  };
  view_count: number;
  createdAt: string;
};

const getProducts = async (decoded: any) => {
  const res = await axios.get(
    "https://buy-and-sell-app-api.vercel.app/api/v1/products",
    {
      withCredentials: true,
    }
  );

  const resData = res.data.products.filter(
    (p: any) => p.user._id == decoded.id
  );

  return resData;
};

const Page = async (searchParams: any) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value!;

  const decoded = jwt.verify(token, "the-dog-is-running-4-to-the-p0@l")!;

  const products = await getProducts(decoded);

  if (products.length == 0) {
    return (
      <>
        <div className="flex justify-between w-full items-center shadow-md h-[60px]">
          <div className=" h-full w-full flex justify-start ms-5 items-center">
            <Link href="/user/userinfo/userproduct/addproduct">
              <span className="cursor-pointer text-2xl px-2 border-2 mx-2 ">
                +
              </span>
            </Link>
            <span>Add Your Product</span>
          </div>
          {/* <div className="h-full w-full me-5 flex justify-end items-center ">
            <input
              type="text"
              placeholder="search products..."
              className=" border-b-2 outline-none px-2 border-black h-1/2 w-[300px]"
            />
            <button className="mx-4">Search</button>
          </div> */}
        </div>
        <div className="text-xl flex justify-center items-center w-full  h-[calc(100vh-120px)]">
          No Product Found.
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-screen mx-auto h-[calc(100vh-60px)] flex-col justify-around  ">
        <div className="flex justify-between w-full items-center shadow-md h-[60px]">
          <div className=" h-full w-full flex justify-start ms-5 items-center">
            <Link href="/user/userinfo/userproduct/addproduct">
              <span className="cursor-pointer text-2xl  px-2 border-2 mx-2 ">
                +
              </span>
            </Link>
            <span className="text-sm">Add Your Product</span>
          </div>
        </div>
        <div
          className={
            products.length > 3
              ? "p-3 w-[95%] sm:w-[90%] h-[calc(100vh-120px)] flex flex-wrap gap-10 overflow-scroll overflow-x-hidden justify-center"
              : "p-3 w-[95%] sm:w-[90%] h-[calc(100vh-120px)] flex flex-wrap gap-10 overflow-scroll overflow-x-hidden justify-center  sm:overflow-y-hidden"
          }
        >
          {products?.map((p: productProp) => (
            <ProductCard
              link={`/user/userinfo/userproduct/${p._id}/editproduct`}
              {...p}
              key={p._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
