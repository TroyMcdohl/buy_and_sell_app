import { cookies } from "next/headers";
import React from "react";
import { notFound } from "next/navigation";
import UserSlide from "@/app/components/User/UserSlide";

const layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value!;

  //   if (token == undefined && token == "logout") {
  //     return <div className="">Page not Found</div>;
  //   } else {
  //     return <div>{children} </div>;
  //   }

  return (
    <>
      {token == undefined || token == "logout" ? (
        <>
          <UserSlide />
          <div className="">{children}</div>
        </>
      ) : (
        notFound()
      )}
    </>
  );
};

export default layout;
