import React from "react";
import UserSlide from "../../components/User/UserSlide";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import axios from "axios";

const getUser = async (decoded: any) => {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/users", {
      withCredentials: true,
    });

    const user = res.data.users.find((u: any) => u._id == decoded.id);

    return user;
  } catch (error) {
    console.log(error);
  }
};

const Page = async () => {
  const faUserIcon = faUser as IconProp;

  const cookieStore = cookies();

  const token = cookieStore.get("jwt")?.value!;

  const decoded = jwt.verify(token, "the-dog-is-running-4-to-the-p0@l")!;

  const user = await getUser(decoded);

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
            User Detail
          </div>
        </div>
        <div className="sm:w-[50%] w-full shadow-md  mx-auto h-full sm:h-[calc(100vh-130px)] flex sm:flex-row flex-col  ">
          <div className="sm:w-1/2 w-[90%] mx-auto sm:my-3 flex  flex-col justfiy-center items-center">
            <Image
              className=" object-cover sm:w-[300px] w-[250px] h-[250px] sm:h-[300px] bg-slate-700  rounded-full my-2 sm:mx-2"
              src={`http://localhost:8000/public/img/users/${user.photo}`}
              alt=""
              width={300}
              height={300}
            />
            <div className="my-4 flex justify-around items-center">
              <Link href="/user/userinfo/userproduct">
                <button className="mx-2 hover:scale-105 text-sm text-white cursor-pointer sm:p-3 px-4 py-2 bg-blue-500 rounded-md">
                  View Your Posts
                </button>
              </Link>
              <Link href="/user/userinfo/updateprofile">
                <button className="mx-2 hover:scale-105 text-sm text-white cursor-pointer sm:p-3 px-4 py-2 bg-green-500 rounded-md">
                  Update Profile
                </button>
              </Link>
              <Link href="/user/userinfo/updatepassword">
                <button className="mx-2 hover:scale-105 text-sm text-white cursor-pointer sm:p-3 px-4 py-2 bg-gray-500 rounded-md">
                  Update Password
                </button>
              </Link>
            </div>
            <div className=" h-full w-full ">
              <div className="font-seminbold text-lg h-[10%] w-full flex justify-center items-center">
                <Link href="/user/userinfo/logout">
                  <button className="sm:mx-2 mt-6  hover:scale-105 text-sm text-white cursor-pointer py-3 px-6 bg-black rounded-md">
                    Logout
                  </button>
                </Link>
              </div>
              {/* <div className="h-[90%] w-full ">
                <div className="h-1/2 w-full  flex justify-center items-center">
                  <Image
                    className=" w-[60%] h-[90%] "
                    alt=""
                    src="https://source.unsplash.com/man-in-black-fitted-cap-TqwUF9mKVuI"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="h-1/2 w-full flex justify-center items-center">
                  <Image
                    className=" w-[60%] h-[90%] "
                    alt=""
                    src="https://source.unsplash.com/man-in-black-fitted-cap-TqwUF9mKVuI"
                    width={150}
                    height={150}
                  />
                </div>
              </div>  */}
            </div>
          </div>
          <div className="sm:w-1/2 w-full flex flex-col justify-evenly items-center">
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">Name</h6>
              <p className=" outline-none w-[80%] h-[40px] indent-2  border-t-2 text-center border-black">
                {user.name}
              </p>
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md"> Email</h6>
              <p className=" outline-none w-[80%] h-[40px] indent-2 border-t-2 text-center border-black">
                {user.email}
              </p>
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">NRC Number</h6>
              <p className=" outline-none w-[80%] h-[40px] indent-2  border-t-2 text-center border-black">
                {user.nrc}
              </p>
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">Phone Number</h6>
              <p className=" outline-none w-[80%] h-[40px] indent-2  border-t-2 text-center border-black">
                {user.ph_num}
              </p>
            </div>
            <div className="w-full flex flex-col justfiy-center items-center">
              <h6 className="my-2 text-xl font-md">Role</h6>
              <p className="outline-none w-[80%] h-[40px] indent-2  border-t-2 text-center border-black">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
