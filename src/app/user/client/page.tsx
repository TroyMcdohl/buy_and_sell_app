import axios from "axios";
import React, { useEffect } from "react";

import { cookies } from "next/headers";
import cookieParser from "cookie-parser";

const page = () => {
  cookieParser();
  const fetchData = async () => {
    const res = await fetch(
      "https://buy-and-sell-app-api.vercel.app/api/v1/category",
      {
        credentials: "include",
      }
    );
  };

  fetchData();

  return <div>page</div>;
};

export default page;
