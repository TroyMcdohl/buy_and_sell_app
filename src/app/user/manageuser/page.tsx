"use client";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/users", {
        withCredentials: true,
      });

      setUsers(res.data.users);
    };
    fetchData();
  }, []);

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
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
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
              <td className="px-6 py-4">{u.email}</td>
              <td className="px-6 py-4">{u.ph_num}</td>
              <td className="px-6 py-4">
                <select
                  value={users.role}
                  name=""
                  id=""
                  onChange={async (e) => {
                    const res = await axios.patch(
                      `http://localhost:8000/api/v1/users/updateuser/${u._id}`,
                      {
                        role: e.target.value,
                      },
                      {
                        withCredentials: true,
                      }
                    );
                  }}
                >
                  <option value="user" selected={u.role == "user"}>
                    user
                  </option>
                  <option value="admin" selected={u.role == "admin"}>
                    admin
                  </option>
                </select>
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
