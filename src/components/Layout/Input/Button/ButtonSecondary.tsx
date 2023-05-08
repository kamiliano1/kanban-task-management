import React from "react";

type ButtonSecondaryProps = { darkMode: boolean };

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({ darkMode }) => {
  return (
    <button
      className={`bg-white text-purple py-2 px-20 rounded-3xl text-500 ${
        !darkMode && "hover:bg-[rgba(99,_95,_199,_0.25)]"
      }`}
    >
      Priamry Small
    </button>
  );
};
export default ButtonSecondary;
