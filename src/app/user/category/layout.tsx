import { cookies } from "next/headers";
import React from "react";
import { notFound } from "next/navigation";
import UserSlide from "@/app/components/User/UserSlide";

const layout = ({ children }: { children: React.ReactNode }) => {
  //   }

  return (
    <>
      <UserSlide />
      <div className="">{children}</div>
    </>
  );
};

export default layout;
