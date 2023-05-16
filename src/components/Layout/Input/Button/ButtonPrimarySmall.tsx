import React from "react";

type ButtonPrimarySmallProps = {
  buttonLabel: string;
  buttonAction: () => void;
};

const ButtonPrimarySmall: React.FC<ButtonPrimarySmallProps> = ({
  buttonLabel,
  buttonAction,
}) => {
  return (
    <button
      onClick={buttonAction}
      className="bg-purple rounded-3xl text-500 py-2
     hover:bg-lightPurple disabled:opacity-25 inline-block
     w-full"
    >
      {buttonLabel}
    </button>
  );
};
export default ButtonPrimarySmall;
