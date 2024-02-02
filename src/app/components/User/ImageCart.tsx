import React from "react";
import Image from "next/image";

type photo = {
  image: string;
  style: string;
};

const ImageCart = (props: photo) => {
  return (
    <Image
      className={props.style}
      src={props.image}
      alt=""
      width={300}
      height={300}
    />
  );
};

export default ImageCart;
