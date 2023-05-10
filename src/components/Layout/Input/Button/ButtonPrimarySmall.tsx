import React from "react";

type ButtonPrimarySmallProps = { buttonLabel: string };

const ButtonPrimarySmall: React.FC<ButtonPrimarySmallProps> = ({
  buttonLabel,
}) => {
  return (
    <button
      disabled
      className="bg-purple py-1 px-5 rounded-3xl text-500 hover:bg-lightPurple disabled:opacity-25"
    >
      {buttonLabel}
    </button>
  );
};
export default ButtonPrimarySmall;
