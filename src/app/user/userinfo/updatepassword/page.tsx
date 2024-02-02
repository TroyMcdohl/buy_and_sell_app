"use client";
import React, { FormEvent, useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  type inputVal = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

  enum InputActionKind {
    OLDPASSWORD = "OLDPASSWORD",
    NEWPASSWORD = "NEWPASSWORD",
    CONFIRMPASSWORD = "CONFIRMPASSWORD",
  }

  type InputAction = {
    type: InputActionKind;
    payload: string;
  };

  const faUserIcon = faUser as IconProp;
  const router = useRouter();

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const inputReducer = (state: inputVal, action: InputAction) => {
    switch (action.type) {
      case InputActionKind.OLDPASSWORD:
        return {
          ...state,
          oldPassword: action.payload as string,
        };

      case InputActionKind.NEWPASSWORD:
        return {
          ...state,
          newPassword: action.payload as string,
        };

      case InputActionKind.CONFIRMPASSWORD:
        return {
          ...state,
          confirmPassword: action.payload as string,
        };

      default:
        return state;
    }
  };

  const initialState: inputVal = {
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  };

  const [state, dispatch] = useReducer(inputReducer, initialState);

  const changeHandler = (
    inputType: InputActionKind,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    return dispatch({
      type: inputType,
      payload: event.target.value,
    });
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.patch(
        "https://buy-and-sell-app-api.vercel.app/api/v1/users/updatepassword",
        {
          oldPassword: state.oldPassword,
          newPassword: state.newPassword,
          confirmPassword: state.confirmPassword,
        },
        {
          withCredentials: true,
        }
      );

      setLoading(false);

      router.push("/user/products");
    } catch (error: any) {
      setLoading(false);
      setErrMsg(error.response.data.message);
      setTimeout(() => {
        setErrMsg("");
      }, 2000);
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
            <span className="sm:text-xl text-sm font-semibold">
              User Information
            </span>
          </div>
          <div className="h-full w-full text-xl font-semibold me-5 flex justify-end items-center ">
            User Password
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="sm:w-[50%] w-full shadow-md justify-center  mx-auto h-[calc(100vh-130px)] flex  "
        >
          <div className="w-1/2 flex flex-col justify-evenly items-center">
            {errMsg && (
              <div className=" w-full mx-auto text-center text-red-500 text-xl ">
                {errMsg}
              </div>
            )}

            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">Old Pasword</h6>
              <input
                type="password"
                className=" outline-none sm:w-[80%] w-full h-[40px] indent-2  border-2  text-center border-black"
                value={state.oldPassword}
                onChange={changeHandler.bind(this, InputActionKind.OLDPASSWORD)}
              />
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">New Password</h6>
              <input
                type="password"
                className=" outline-none sm:w-[80%] w-full h-[40px] indent-2 border-2  text-center border-black"
                value={state.newPassword}
                onChange={changeHandler.bind(this, InputActionKind.NEWPASSWORD)}
              />
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">Confirm Password</h6>
              <input
                type="password"
                className=" outline-none sm:w-[80%] w-full h-[40px] indent-2 border-2  text-center border-black"
                value={state.confirmPassword}
                onChange={changeHandler.bind(
                  this,
                  InputActionKind.CONFIRMPASSWORD
                )}
              />
            </div>

            <div className="w-full flex flex-col justfiy-center items-center">
              <button
                type="submit"
                className="hover:bg-gray-400 px-6 py-3   bg-green-400 text-white rounded-md"
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
