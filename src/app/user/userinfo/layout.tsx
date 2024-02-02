import { cookies } from "next/headers";
import React from "react";
import { notFound } from "next/navigation";
import UserSlide from "@/app/components/User/UserSlide";

const layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();

  const token = cookieStore.get("jwt")?.value!;

  cookieStore.set("jwt", token);

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
