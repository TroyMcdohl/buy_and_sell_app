"use client";
import axios from "axios";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("https://buy-and-sell-app-api.vercel.app/api/v1/users", {
        withCredentials: true,
      });
    };
    fetchData();
  }, []);

  return <div>page</div>;
};

export default page;
