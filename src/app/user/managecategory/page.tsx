"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState<any>();
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://buy-and-sell-app-api.vercel.app/api/v1/category",
        {
          withCredentials: true,
        }
      );

      setUsers(res.data.categories);
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="p-5 w-[90%] mx-auto  h-full">
      <div className="h-[80px] flex justify-between items-center">
        <div className="ms-2 text-xl font-medium">User</div>
      </div>
      <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u: any) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={u._id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {u._id}
              </th>
              <td className="px-6 py-4">{u.name}</td>
              <td scope="col" className="px-6 py-3">
                <button
                  onClick={async () => {
                    const res = await axios.delete(
                      `https://buy-and-sell-app-api.vercel.app/api/v1/category/${u._id}`,
                      {
                        withCredentials: true,
                      }
                    );

                    setRefresh(true);
                    setTimeout(() => {
                      setRefresh(false);
                    }, 1000);
                  }}
                  className="bg-red-400 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10 w-full justify-end">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              &lt;&lt;
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              &gt;&gt;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Page;
