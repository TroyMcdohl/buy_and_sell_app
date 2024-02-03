import { cookies } from "next/headers";
import React from "react";
import { notFound } from "next/navigation";
import UserSlide from "@/app/components/User/UserSlide";
import jwt from "jsonwebtoken";
import axios from "axios";

const getUser = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/users", {
    withCredentials: true,
  });

  return res.data.users;
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value!;

  const decoded: any = jwt.verify(token, "the-dog-is-running-4-to-the-p0@l")!;

  const users = await getUser();

  const user = users.find((u: any) => u._id == decoded.id);

  return (
    <>
      {token == undefined || token == "logout" ? (
        notFound()
      ) : (
        <>
          {user.role == "admin" ? (
            <>
              <UserSlide />
              <div className="">{children}</div>
            </>
          ) : (
            notFound()
          )}
        </>
      )}
    </>
  );
};

export default layout;
