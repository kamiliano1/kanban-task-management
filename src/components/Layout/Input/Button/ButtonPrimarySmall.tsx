import React from "react";

type ButtonPrimarySmallProps = {};

const ButtonPrimarySmall: React.FC<ButtonPrimarySmallProps> = () => {
  return (
    <button className="bg-purple py-2 px-20 rounded-3xl text-500 hover:bg-lightPurple">
      Priamry Small
    </button>
  );
};
export default ButtonPrimarySmall;
