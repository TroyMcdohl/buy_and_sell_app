import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "timeago.js";

type productProp = {
  _id: string;
  name: string;
  price: number;
  description: string;
  photo: string;
  category: {
    _id: string;
    name: string;
  };
  user: {
    name: string;
    photo: string;
  };
  view_count: number;
  link: string;
  createdAt: string;
};

const ProductCard = (props: productProp) => {
  return (
    <Link href={props.link}>
      <div className="cursor-pointer hover:scale-105 shadow-lg w-full h-[350px]  sm:w-[450px] sm:h-[500px]">
        <div className="flex justify-between items-center h-1/6 ">
          <div className="flex mx-2 justify-center items-center">
            <Image
              className=" object-cover w-[50px] h-[50px] bg-slate-700 rounded-full mx-2"
              src={`http://localhost:8000/public/img/users/${props.user.photo}`}
              alt=""
              width={50}
              height={50}
            />

            <p className="font-bold text-sm">{props.user.name}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h5 className="mx-2 text-xs font-medium ">
              {format(new Date(props.createdAt).toLocaleString())}
            </h5>
          </div>
        </div>
        <div className="h-4/6 ">
          <Image
            className="mx-auto w-[90%] h-full"
            src={`http://localhost:8000/public/img/product/${props.photo}`}
            alt=""
            width={500}
            height={500}
          />
        </div>
        <div className="h-1/6  flex">
          <div className="w-1/2 h-full flex justify-center items-center">
            <p className="text-xs indent-4 m-2 ">
              {props.description.slice(0, 50)}...
            </p>
          </div>
          <div className="w-1/2 h-full border-l-2 flex justify-around items-center">
            <div className="flex flex-col justify-center items-center">
              <h6 className="font-bold sm:text-lg text-sm">Price</h6>
              <p className="text-sm">{props.price} kyats</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h6 className="font-bold sm:text-lg text-sm">Category</h6>
              <p className="text-sm">{props.category.name}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
