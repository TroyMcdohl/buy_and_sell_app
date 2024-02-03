"use client";
import React, { FormEvent, useEffect, useReducer, useState } from "react";
import UserSlide from "../../../../components/User/UserSlide";
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

const Page = () => {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [cate, setCate] = useState<{ _id: string; name: string }[]>();
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

  //   Category List
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/category", {
        withCredentials: true,
      });

      setCate(res.data.categories);
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
          return { ...prev, category: { _id: payload, name: "" } };
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
    event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
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
      data.price.trim() == "" ||
      data.description.trim() == "" ||
      data.category._id == "" ||
      data.photo == null
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
      const res = await axios.post(
        `http://localhost:8000/api/v1/products/`,

        form,

        {
          withCredentials: true,
        }
      );

      router.push(`/user/products/`);
      router.refresh();
    } catch (error: any) {
      setErr(error.response.data.message);
      setTimeout(() => {
        setErr("");
      }, 2000);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen mx-auto h-[calc(100vh-60px)] flex-col justify-around  ">
        <div className="flex justify-between w-full items-center shadow-md h-[70px]">
          <div className="h-full w-full flex justify-start ms-5 items-center">
            <FontAwesomeIcon
              icon={faUserIcon}
              className="w-[30px] h-[30px] mx-2"
            />
            <span className="text-xl font-semibold">User Information</span>
          </div>
          <div className="h-full w-full text-xl font-semibold me-5 flex justify-end items-center ">
            User Profile
          </div>
        </div>
        {err && (
          <div className="absolute text-center w-full p-4 text-red-500">
            {err}
          </div>
        )}
        <form
          onSubmit={submitHandler}
          className="w-[50%] shadow-md  mx-auto h-[calc(100vh-130px)] flex  "
        >
          <div className="w-1/2 flex flex-col items-center justify-center">
            <Image
              src={file}
              alt="ADD YOUR IMAGE"
              className="object-cover w-[300px] h-[300px] bg-slate-700  rounded-sm mx-2"
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

          <div className="w-1/2 flex flex-col justify-evenly items-center">
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
                onChange={changeHandler.bind(this, InputActionKind.DESCRIPTION)}
              />
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">Category</h6>
              <select
                name=""
                id=""
                // value={data.category.name}
                onChange={changeHandler.bind(this, InputActionKind.CATEGORY)}
                className=" outline-none w-[80%] h-[40px] indent-2  border-2  text-center border-black"
              >
                <option value="null">Select your category</option>
                {cate?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full  flex justify-evenly items-center">
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
    </>
  );
};

export default Page;
