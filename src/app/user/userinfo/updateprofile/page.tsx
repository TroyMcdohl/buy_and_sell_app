"use client";
import React, { FormEvent, useEffect, useReducer, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

type inputVal = {
  name: string;
  email: string;
  nrc: string;
  role: string;
  ph_num: number;
  photo: any;
};

enum InputActionKind {
  NAME = "NAME",
  EMAIL = "EMAIL",
  NRC = "NRC",
  ROLE = "ROLE",
  PH_NUM = "PH_NUM",
  PHOTO = "PHOTO",
}

type InputAction = {
  type: InputActionKind;
  payload: string | number | any;
};

const Page = () => {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(false);
  const [file, setFile] = useState<any>(null);
  const faUserIcon = faUser as IconProp;

  useEffect(() => {
    setClient(true);
  }, []);

  const data =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user")!);

  const user = data;

  const inputReducer = (state: inputVal, action: InputAction) => {
    switch (action.type) {
      case InputActionKind.NAME:
        return {
          ...state,
          name: action.payload as string,
        };

      case InputActionKind.EMAIL:
        return {
          ...state,
          email: action.payload as string,
        };

      case InputActionKind.NRC:
        return {
          ...state,
          nrc: action.payload as string,
        };

      case InputActionKind.ROLE:
        return {
          ...state,
          role: action.payload as string,
        };

      case InputActionKind.PH_NUM:
        return {
          ...state,
          ph_num: action.payload as number,
        };
      case InputActionKind.PHOTO:
        return {
          ...state,
          photo: action.payload[0],
        };

      default:
        return state;
    }
  };

  const initialState: inputVal = {
    name: user.name,
    email: user.email,
    nrc: user.nrc,
    role: user.role,
    ph_num: user.ph_num,
    photo: user.photo,
  };

  const [state, dispatch] = useReducer(inputReducer, initialState);

  const changeHandler = (
    inputType: InputActionKind,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (inputType == InputActionKind.PHOTO) {
      if (event.target.files) {
        setFile(URL.createObjectURL(event.target.files[0]));
      }
      dispatch({
        type: inputType,
        payload: event.target.files,
      });
    } else {
      dispatch({
        type: inputType,
        payload: event.target.value,
      });
    }
  };

  const submitHandler = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (state.name.trim() == "" || state.email.trim() == "") {
      setLoading(false);
      return setErr("Please fill the form completely.");
    }

    const form = new FormData();

    form.append("name", state.name);
    form.append("email", state.email);
    form.append("ph_num", state.ph_num.toString());
    form.append("nrc", state.nrc);
    form.append("photo", state.photo);

    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/users/updateme",

        form,

        {
          withCredentials: true,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
      router.push("/user/userinfo");
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
        {err && <div className="text-center p-4 text-red-500">{err}</div>}
        <form
          onSubmit={submitHandler}
          className="w-[50%] shadow-md  mx-auto h-[calc(100vh-130px)] flex  "
        >
          <div className="w-1/2 my-3 flex flex-col justfiy-center items-center">
            {client && (
              <Image
                src={
                  file
                    ? file
                    : `http://localhost:8000/public/img/users/${state.photo}`
                }
                alt=""
                className="object-cover w-[300px] h-[300px] bg-slate-700  rounded-full mx-2"
                width={300}
                height={300}
              />
            )}
            <div className="my-4">
              <input
                type="file"
                name=""
                id=""
                className="w-full text-center border-2 border-gray-400"
                onChange={changeHandler.bind(this, InputActionKind.PHOTO)}
              />
            </div>
            <div className=" h-full w-full"></div>
          </div>
          <div className="w-1/2 flex flex-col justify-evenly items-center">
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">Name</h6>
              <input
                type="text"
                className=" outline-none w-[80%] h-[40px] indent-2  border-2  text-center border-black"
                value={state.name}
                onChange={changeHandler.bind(this, InputActionKind.NAME)}
              />
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md"> Email</h6>
              <input
                type="text"
                className=" outline-none w-[80%] h-[40px] indent-2 border-2  text-center border-black"
                value={state.email}
                onChange={changeHandler.bind(this, InputActionKind.EMAIL)}
              />
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">NRC Number</h6>
              <input
                type="text"
                className=" outline-none w-[80%] h-[40px] indent-2  border-2  text-center border-black"
                value={state.nrc}
                onChange={changeHandler.bind(this, InputActionKind.NRC)}
              />
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">Phone Number</h6>
              <input
                type="text"
                className=" outline-none w-[80%] h-[40px] indent-2  border-2  text-center border-black"
                value={state.ph_num}
                onChange={changeHandler.bind(this, InputActionKind.PH_NUM)}
              />
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">Role</h6>
              <input
                type="text"
                className="outline-none w-[80%] h-[40px] indent-2  border-2  text-center border-black"
                value={state.role}
                onChange={changeHandler.bind(this, InputActionKind.ROLE)}
                disabled
              />
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <button
                className="hover:bg-gray-400 px-6 py-3  bg-green-400 text-white rounded-md"
                type="submit"
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
                  "Update"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
