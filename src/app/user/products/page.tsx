import React from "react";
import UserSlide from "../../components/User/UserSlide";
import Image from "next/image";
import ProductCard from "../../components/User/ProductCard";
import axios from "axios";

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
  createdAt: string;
  view_count: number;
};

const getProducts = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/products/", {
    withCredentials: true,
  });

  const resData = res.data.products;

  return resData;
};

const getQueryProducts = async (type: string) => {
  const res = await axios.get(
    `http://localhost:8000/api/v1/products?type=${type}`,
    {
      withCredentials: true,
    }
  );

  const resData = res.data.products;

  return resData;
};

const Page = async ({
  searchParams,
}: {
  searchParams: {
    type: string;
  };
}) => {
  let products;

  if (searchParams.type) {
    products = await getQueryProducts(searchParams.type);
  } else {
    products = await getProducts();
  }

  if (products.length == 0) {
    return (
      <>
        <UserSlide />
        <div className="flex justify-between w-full items-center shadow-md h-[60px]">
          <div className=" h-full w-full flex justify-start ms-5 items-center">
            <h6 className="font-bold text-xl">Home Page</h6>
          </div>
        </div>
        <div className="text-xl flex justify-center items-center w-full  h-[calc(100vh-120px)]">
          No Product Found.
        </div>
      </>
    );
  }

  return (
    <>
      <UserSlide />
      <div className="w-screen mx-auto h-[calc(100vh-60px)] flex-col justify-around  ">
        <div className="flex justify-between w-full items-center shadow-md h-[60px]">
          <div className=" h-full w-full flex justify-start ms-5 items-center">
            <h6 className="font-bold text-xl">Home Page</h6>
          </div>
          {/* <div className="h-full w-full me-5 flex justify-end items-center ">
            <input
              type="text"
              placeholder="search products..."
              className=" border-b-2 outline-none px-2 border-black h-1/2 w-[300px]"
              onChange={changeHandler}
            />
            <button className="mx-4" onClick={clickHandler}>
              Search
            </button>
          </div> */}
        </div>
        <div
          className={
            products.length > 3
              ? "p-3 w-[95%] sm:w-[90%] h-[calc(100vh-120px)] flex flex-wrap gap-10 overflow-scroll overflow-x-hidden justify-center"
              : "p-3 w-[95%] sm:w-[90%] h-[calc(100vh-120px)] flex flex-wrap gap-10 overflow-scroll overflow-x-hidden justify-center  sm:overflow-y-hidden"
          }
        >
          {products?.map((p: productProp) => (
            <ProductCard link={`/user/products/${p._id}`} {...p} key={p._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
