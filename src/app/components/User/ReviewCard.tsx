import Image from "next/image";
import Link from "next/link";
import ReviewOne from "./ReviewOne";
import { cookies } from "next/headers";

const reviewData = async (params: string) => {
  try {
    const res = await fetch(
      `https://buy-and-sell-app-api.vercel.app/api/v1/products/${params}/rating`
    );

    const resData = await res.json();

    const data = await resData.ratings;
    const productData = data.filter((d: any) => d.product == params);

    return productData;
  } catch (error) {
    console.log(error);
  }
};

export default async function ReviewCard(props: {
  params: string;
  owner: any;
}) {
  const data = await reviewData(props.params);

  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value!;

  if (data.length == 0) {
    return (
      <div className="w-full sm:h-[300px] h-[500px] flex sm:flex-row flex-col">
        <div className="sm:w-1/2 w-full h-full  overflow-scrsoll overflow-x-hidden ">
          {token !== undefined && token != "logout" && (
            <Link href={`/user/products/${props.params}/addcomment`}>
              <button className="w-full px-4 py-2 text-center bg-gray-100">
                Add your comments
              </button>
            </Link>
          )}
          <div className="flex justify-center items-center my-8">
            No Comments Found.
          </div>
        </div>
        <div className="sm:w-1/2 w-full h-full flex justify-center items-center flex-col border-2 ">
          <h6 className="font-bold text-xl p-4">Contact Detail</h6>
          <div className="flex justify-evenly items-center w-[80%] h-[80%] flex-col">
            <div className="flex flex-col  justify-center items-center">
              <h6 className="text-xl font-semibold">Name</h6>
              <hr className="w-[80%] bg-black" />
              <h4 className="my-2 ">{props.owner.name}</h4>
            </div>
            <div className="flex flex-col  justify-center items-center">
              <h6 className="text-xl font-semibold">Contact Number</h6>
              <hr className="w-[80%] bg-black" />
              <h4 className="my-2">{props.owner.ph_num}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] flex">
      <div className="w-1/2 h-full  overflow-scrsoll overflow-x-hidden">
        {token !== undefined && token != "logout" && (
          <Link href={`/user/products/${props.params}/addcomment`}>
            <button className="w-full px-4 py-2 text-center bg-gray-100">
              Add your comments
            </button>
          </Link>
        )}
        {data.map((d: any) => (
          <ReviewOne review={d} key={d._id} productId={props.params} />
        ))}
      </div>
      <div className="w-1/2 h-full flex justify-center items-center flex-col border-2 ">
        <h6 className="font-bold text-xl p-4">Contact Detail</h6>
        <div className="flex justify-evenly items-center w-[80%] h-[80%] flex-col">
          <div className="flex flex-col  justify-center items-center">
            <h6 className="text-xl font-semibold">Name</h6>
            <hr className="w-[80%] bg-black" />
            <h4 className="my-2 ">{props.owner.name}</h4>
          </div>
          <div className="flex flex-col  justify-center items-center">
            <h6 className="text-xl font-semibold">Contact Number</h6>
            <hr className="w-[80%] bg-black" />
            <h4 className="my-2">{props.owner.ph_num}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
