import AdminSlide from "@/app/components/Admin/AdminSlide";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleInfo,
  faDeleteLeft,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const page = () => {
  const detailIcon = faCircleInfo as IconProp;
  const deleteIcon = faDeleteLeft as IconProp;
  const updateIcon = faPenToSquare as IconProp;

  return (
    <AdminSlide>
      <div className="p-5 w-[90%] mx-auto  h-full">
        <div className="h-[80px] flex justify-between items-center">
          <div className="ms-2 text-xl font-medium">Request</div>
          <div className="mx-2">
            <input
              type="text"
              placeholder="search here..."
              className="border-b-2 px-2 outline-none  border-b-black"
            />
            <button className="mx-2">Search</button>
          </div>
        </div>
        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="text-green-500">success</td>
              <td className="px-6 py-4 flex items-center mx-0">
                <Link title="check" href="#">
                  <FontAwesomeIcon
                    icon={updateIcon}
                    className="text-green-500 ms-4 w-5"
                  />
                </Link>
                <Link title="delete" href="#">
                  <FontAwesomeIcon
                    icon={deleteIcon}
                    className=" text-red-500 ms-4  w-5"
                  />
                </Link>
              </td>
            </tr>{" "}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="text-green-500">success</td>
              <td className="px-6 py-4 flex items-center mx-0">
                <Link title="check" href="#">
                  <FontAwesomeIcon
                    icon={updateIcon}
                    className="text-green-500 ms-4 w-5"
                  />
                </Link>
                <Link title="delete" href="#">
                  <FontAwesomeIcon
                    icon={deleteIcon}
                    className=" text-red-500 ms-4  w-5"
                  />
                </Link>
              </td>
            </tr>{" "}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="text-green-500">success</td>
              <td className="px-6 py-4 flex items-center mx-0">
                <Link title="check" href="#">
                  <FontAwesomeIcon
                    icon={updateIcon}
                    className="text-green-500 ms-4 w-5"
                  />
                </Link>
                <Link title="delete" href="#">
                  <FontAwesomeIcon
                    icon={deleteIcon}
                    className=" text-red-500 ms-4  w-5"
                  />
                </Link>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="text-green-500">success</td>
              <td className="px-6 py-4 flex items-center mx-0">
                <Link title="check" href="#">
                  <FontAwesomeIcon
                    icon={updateIcon}
                    className="text-green-500 ms-4 w-5"
                  />
                </Link>
                <Link title="delete" href="#">
                  <FontAwesomeIcon
                    icon={deleteIcon}
                    className=" text-red-500 ms-4  w-5"
                  />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul className="inline-flex mt-2 -space-x-px text-base h-10 w-full justify-end">
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
    </AdminSlide>
  );
};

export default page;
