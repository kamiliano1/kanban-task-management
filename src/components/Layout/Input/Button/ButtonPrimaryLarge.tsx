import React from "react";

type ButtonPrimaryLargeProps = {};

const ButtonPrimaryLarge: React.FC<ButtonPrimaryLargeProps> = () => {
  return (
    <button className="bg-purple py-4 px-20 rounded-3xl text-700 hover:bg-lightPurple">
      Priamry
    </button>
  );
};
export default ButtonPrimaryLarge;
