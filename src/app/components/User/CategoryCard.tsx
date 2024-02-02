import Link from "next/link";
import React from "react";

const CategoryCard = (props: { _id: string; name: string }) => {
  return (
    <Link href={`/user/products?type=${props._id}`}>
      <div className="m-4 inline-block px-4 py-2 border-2 rounded-xl cursor-pointer">
        {props.name}
      </div>
    </Link>
  );
};

export default CategoryCard;
