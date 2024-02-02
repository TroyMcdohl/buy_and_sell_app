"use client";
import React, { FormEvent, useEffect, useReducer, useState } from "react";
import UserSlide from "../../../../../components/User/UserSlide";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputType } from "zlib";
import LoadingCart from "@/app/components/User/LoadingCart";

type inputVal = {
  name: string;
  photo: any | null;
  price: string;
  description: string;
  category: {
    name: string;
    _id: any;
  };
};

enum InputActionKind {
  NAME = "NAME",
  PRICE = "PRICE",
  PHOTO = "PHOTO",
  DESCRIPTION = "DESCRIPTION",
  CATEGORY = "CATEGORY",
}

type InputAction = {
  type: InputActionKind;
  payload: string | number | any;
};

type paramsType = {
  params: {
    id: string;
  };
};

const page = (props: paramsType) => {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [file, setFile] = useState<any>();

  const [data, setData] = useState<inputVal>({
    name: "",
    photo: null,
    price: "",
    description: "",
    category: {
      name: "",
      _id: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const product = await axios.get(
        `https://buy-and-sell-app-api.vercel.app/api/v1/products/${props.params.id}`,
        {
          withCredentials: true,
        }
      );

      setData(product.data.products);
    };
    fetchData();
  }, []);

  const faUserIcon = faUser as IconProp;

  const inputReducer = (type: InputType, payload: string | number | any) => {
    switch (type) {
      case InputActionKind.NAME:
        setData((prev) => {
          return { ...prev, name: payload };
        });
        break;

      case InputActionKind.PRICE:
        setData((prev) => {
          return { ...prev, price: payload };
        });
        break;

      case InputActionKind.DESCRIPTION:
        setData((prev) => {
          return { ...prev, description: payload };
        });
        break;

      case InputActionKind.CATEGORY:
        setData((prev) => {
          return { ...prev, category: payload };
        });
        break;
      case InputActionKind.PHOTO:
        setData((prev) => {
          return { ...prev, photo: payload };
        });

        break;

      default:
        return data;
    }
  };

  const changeHandler = (
    inputType: InputActionKind,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (inputType == InputActionKind.PHOTO) {
      if (event.target.files != null) {
        setFile(URL.createObjectURL(event.target.files[0]));
      }
      inputReducer(inputType, event.target.files);
    } else {
      inputReducer(inputType, event.target.value);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (
      data.name.trim() == "" ||
      data.price == "" ||
      data.description.trim() == "" ||
      data.category._id == ""
    ) {
      setLoading(false);
      return setErr("Please Fill Details Completely.");
    }
    const form = new FormData();

    form.append("name", data.name);
    form.append("price", data.price);
    form.append("description", data.description);

    form.append("photo", data.photo[0]);

    form.append("category", data.category._id);

    try {
      const res = await axios.patch(
        `https://buy-and-sell-app-api.vercel.app/api/v1/products/${props.params.id}`,

        form,

        {
          withCredentials: true,
        }
      );

      router.push(`/user/products/${props.params.id}`);
      router.refresh();
    } catch (error: any) {
      setErr(error.response.data.message);
      setTimeout(() => {
        setErr("");
      }, 2000);
      setLoading(false);
    }
  };

  const clickHandler = async () => {
    setDelLoading(true);
    try {
      const res = await axios.delete(
        `https://buy-and-sell-app-api.vercel.app/api/v1/products/${props.params.id}`,

        {
          withCredentials: true,
        }
      );

      setDelLoading(false);
      router.push(`/user/products/`);
      router.refresh();
    } catch (error: any) {
      setErr(error.response.data.message);
      setTimeout(() => {
        setErr("");
      }, 2000);
      setDelLoading(false);
    }
  };

  return (
    <>
      {data.name != "" && (
        <div className="w-screen mx-auto h-[calc(100vh-60px)] flex-col justify-around  ">
          <div className="flex justify-between w-full items-center shadow-md h-[70px]">
            <div className="h-full w-full flex justify-start ms-5 items-center">
              <FontAwesomeIcon
                icon={faUserIcon}
                className="w-[30px] h-[30px] mx-2"
              />
              <span className="sm:text-xl text-sm font-semibold">
                User Information
              </span>
            </div>
            <div className="h-full w-full text-xl font-semibold me-5 flex justify-end items-center ">
              User Profile
            </div>
          </div>
          {err && <div className="text-center p-4 text-red-500">{err}</div>}
          <form
            onSubmit={submitHandler}
            className="sm:w-[50%] w-full shadow-md  mx-auto h-[calc(100vh-130px)] flex sm:flex-row flex-col  "
          >
            <div className="sm:w-1/2 w-full flex flex-col items-center justify-center">
              <Image
                src={
                  file
                    ? file
                    : `https://buy-and-sell-app-api.vercel.app/public/img/product/${data.photo}`
                }
                alt=""
                className="object-cover w-[300px] h-[300px] bg-slate-700  rounded-sm my-2 sm:mx-2"
                width={300}
                height={300}
              />

              <div className="my-4">
                <input
                  type="file"
                  name=""
                  id=""
                  onChange={changeHandler.bind(this, InputActionKind.PHOTO)}
                  className="w-full text-center border-2 border-gray-400"
                />
              </div>
            </div>

            <div className="sm:w-1/2 w-full flex flex-col justify-evenly items-center">
              <div className="w-full flex flex-col justfiy-center items-center">
                <h6 className="my-2 text-xl font-md">Name</h6>
                <input
                  type="text"
                  className=" outline-none w-[80%] h-[40px] indent-2  border-2  text-center border-black"
                  value={data.name}
                  onChange={changeHandler.bind(this, InputActionKind.NAME)}
                />
              </div>
              <div className="w-full flex flex-col justfiy-center items-center">
                <h6 className="my-2 text-xl font-md">Price</h6>
                <input
                  type="number"
                  className=" outline-none w-[80%] h-[40px] indent-2 border-2  text-center border-black"
                  value={data.price}
                  onChange={changeHandler.bind(this, InputActionKind.PRICE)}
                />
              </div>
              <div className="w-full flex flex-col justfiy-center items-center">
                <h6 className="my-2 text-xl font-md">Description</h6>
                <input
                  type="text"
                  className=" outline-none w-[80%] h-[40px] indent-2  border-2  text-center border-black"
                  value={data.description}
                  onChange={changeHandler.bind(
                    this,
                    InputActionKind.DESCRIPTION
                  )}
                />
              </div>
              <div className="w-full flex flex-col justfiy-center items-center">
                <h6 className="my-2 text-xl font-md">Category</h6>
                <input
                  type="text"
                  className=" outline-none w-[80%] h-[40px] indent-2  border-2  text-center border-black"
                  value={data.category.name}
                  onChange={changeHandler.bind(this, InputActionKind.CATEGORY)}
                />
              </div>

              <div className="w-full my-2 flex justify-evenly items-center">
                <button
                  className="hover:bg-gray-400 px-6 py-3  bg-red-400 text-white rounded-md"
                  onClick={clickHandler}
                  disabled={delLoading}
                >
                  {delLoading ? <LoadingCart /> : "Delete"}
                </button>
                <button
                  className="hover:bg-gray-400 px-6 py-3  bg-green-400 text-white rounded-md"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <LoadingCart /> : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default page;
