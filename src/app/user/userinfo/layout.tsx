import { cookies } from "next/headers";
import React from "react";
import { notFound } from "next/navigation";
import UserSlide from "@/app/components/User/UserSlide";

const storeCokie = async (token: any) => {
  cookies().set({
    name: "jwt",
    value: token,
    httpOnly: true,
  });
};

const layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();

  const token = cookieStore.get("jwt")?.value!;

  storeCokie(token);

  return (
    <>
      {token == undefined || token == "logout" ? (
        notFound()
      ) : (
        <>
          <UserSlide />
          <div className="">{children}</div>
        </>
      )}
    </>
  );
};

export default layout;
