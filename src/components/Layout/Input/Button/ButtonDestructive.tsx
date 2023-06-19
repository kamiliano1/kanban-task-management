import React from "react";

type ButtonDestructiveProps = {
  buttonLabel: string;
  buttonAction: () => void;
};

const ButtonDestructive: React.FC<ButtonDestructiveProps> = ({
  buttonLabel,
  buttonAction,
}) => {
  return (
    <button
      className="bg-red py-2 text-white rounded-3xl text-500 w-full hover:bg-lightRed"
      onClick={buttonAction}
    >
      {buttonLabel}
    </button>
  );
};
export default ButtonDestructive;
