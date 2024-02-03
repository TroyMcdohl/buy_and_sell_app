"use client";
import CategoryCard from "@/app/components/User/CategoryCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  const [client, setClient] = useState(false);
  const userData =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user")!);

  const user = userData;

  const [data, setData] = useState<{ _id: string; name: string }[]>([
    { _id: "", name: "" },
  ]);
  useEffect(() => {
    setClient(true);
    const fetchData = async () => {
      const res = await axios.get(
        "https://buy-and-sell-app-api.vercel.app/api/v1/category",
        {
          withCredentials: true,
        }
      );

      setData(res.data.categories);
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-between w-full items-center shadow-md h-[60px]">
        <div className=" h-full w-full flex justify-between ms-5 items-center">
          <h6 className="font-bold text-xl">Category Page</h6>
          {client && user?.role == "admin" && (
            <Link href="/user/category/createcategory">
              {" "}
              <div className="me-4 border-2 p-2 cursor-pointer">
                <span className="font-bold text-2xl mx-2">+</span>Add Category
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="text-xl  flex justify-center  w-full  h-[calc(100vh-120px)]">
        <div className="flex justify-center items-center w-1/2 h-1/2 my-6 shadow-lg">
          {data.map((d: any) => (
            <CategoryCard {...d} key={d._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
