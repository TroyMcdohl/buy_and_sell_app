import UserSlide from "@/app/components/User/UserSlide";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import ReviewCard from "@/app/components/User/ReviewCard";

//props.params && searchParams find param and query

const getProduct = async (id: string) => {
  const res = await fetch(
    `https://buy-and-sell-app-api.vercel.app/api/v1/products/${id}`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  const resData = await res.json();

  return resData.products;
};

export default async function page(props: {
  params: { id: string };
  searchParams: object;
}) {
  const product = await getProduct(props.params.id);

  const faEyeIcon = faEye as IconProp;
  return (
    <>
      <UserSlide />
      <div className=" flex justify-between w-full items-center shadow-md h-[70px]">
        <div className="h-full w-full flex justify-start ms-5 items-center">
          {/* <FontAwesomeIcon
            icon={}
            className="w-[30px] h-[30px] mx-2"
          /> */}
          <span className="text-xl font-semibold">Product Information</span>
        </div>
        <div className="h-full w-full text-xl font-semibold me-5 flex justify-end items-center ">
          Product Detail
        </div>
      </div>
      <div className="  px-4 h-[60px] flex items-center  w-full font-bold text-2xl">
        CATEGORY - {product.category.name}
      </div>
      <div className="flex sm:flex-row flex-col  h-[calc(100vh-190px)] w-[90%] sm:w-[80%] mx-auto">
        <div className="sm:w-1/2 w-full flex justify-center items-center  h-full">
          <div className="w-[80%] h-[70%] shadow-lg flex flex-col justify-center items-center">
            <Image
              alt=""
              src={`https://buy-and-sell-app-api.vercel.app/public/img/product/${product.photo}`}
              className=" w-[90%] h-[80%]"
              height={500}
              width={500}
            />
          </div>
        </div>
        <div className="sm:w-1/2 w-full flex justify-center items-center h-full ">
          <div className="h-[100%] w-full ">
            <h6 className="my-4 font-semibold text-2xl">{product.name}</h6>
            <h6 className="my-4 font-semibold text-xl">
              {product.price} kyats
            </h6>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faEyeIcon}
                className="w-[20px] h-[20px] mx-2"
              />
              <span>{product?.view_count}</span>
            </div>
            <p
              className={`${
                product.description.length > 100
                  ? " font-medium h-[250px] bg-white my-4 overflow-scroll overflow-x-hidden"
                  : " font-mediumbg-white my-4"
              }`}
            >
              {product.description}
            </p>
            <ReviewCard params={props.params.id} owner={product.user} />
          </div>
        </div>
      </div>
    </>
  );
}
