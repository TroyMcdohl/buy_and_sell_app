"use server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faChildren,
  faHouseUser,
  faMailBulk,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { cookies } from "next/headers";
import axios from "axios";
import jwt from "jsonwebtoken";

const getUser = async () => {
  const res = await axios.get(
    "https://buy-and-sell-app-api.vercel.app/api/v1/users",
    {
      headers: { Cookie: cookies().get("jwt")?.value! },
      withCredentials: true,
    }
  );

  return res.data.users;
};

const UserSlide: React.FC = async () => {
  const faPropIcon = faChildren as IconProp;
  const faHouseIcon = faHouseUser as IconProp;
  const faUsersIcon = faUsers as IconProp;
  const faBellIcon = faBell as IconProp;
  const faMailIcon = faMailBulk as IconProp;
  let user;

  const cookieStore = cookies();

  const token = cookieStore.get("jwt")?.value!;

  const notAuth = token == undefined || token == "logout";

  const auth = token != undefined && token != "logout";

  if (auth) {
    const decoded: any = jwt.verify(token, "the-dog-is-running-4-to-the-p0@l")!;
    const users = await getUser();

    user = users.find((u: any) => u._id == decoded.id);
  }

  return (
    <div
      style={{ backgroundColor: "#e7ecef" }}
      className="h-[60px] w-[100%] flex justify-center items-center"
    >
      <ul className="flex sm:w-1/3 w-full justify-around sm:justify-evenly items-center">
        <Link href={"/user/products"}>
          <li className="cursor-pointer hover:text-blue-500">Home</li>
        </Link>
        <Link href={"/user/category"}>
          <li className=" cursor-pointer hover:text-blue-500 ">Category</li>
        </Link>
        {auth && (
          <>
            <Link href={"/user/userinfo"}>
              <li className=" cursor-pointer hover:text-blue-500 ">UserInfo</li>
            </Link>
            {user.role == "admin" && (
              <>
                <Link href={"/user/manageuser"}>
                  <li className=" cursor-pointer hover:text-blue-500 ">
                    Manage Users
                  </li>
                </Link>
                <Link href={"/user/managecategory"}>
                  <li className=" cursor-pointer hover:text-blue-500 ">
                    Manage Category
                  </li>
                </Link>
              </>
            )}
          </>
        )}

        {notAuth && (
          <>
            <Link href={"/auth/register"}>
              <li className=" cursor-pointer hover:text-blue-500 ">Signup</li>
            </Link>
            <Link href={"/auth/login"}>
              <li className=" cursor-pointer hover:text-blue-500 ">Login</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default UserSlide;
