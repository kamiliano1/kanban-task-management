import React from "react";

type ButtonDestructiveProps = {};

const ButtonDestructive: React.FC<ButtonDestructiveProps> = () => {
  return (
    <button className="bg-red py-2 px-20 rounded-3xl text-500 hover:bg-lightRed">
      Destructive
    </button>
  );
};
export default ButtonDestructive;
