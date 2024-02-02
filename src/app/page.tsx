"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/user/products");
  }, [router]);
  return <div className=""></div>;
};

export default Page;
