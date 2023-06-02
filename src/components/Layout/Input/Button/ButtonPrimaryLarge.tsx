import React from "react";

type ButtonPrimaryLargeProps = {
  buttonLabel: string;
  buttonAction: () => void;
};

const ButtonPrimaryLarge: React.FC<ButtonPrimaryLargeProps> = ({
  buttonLabel,
  buttonAction,
}) => {
  return (
    <button
      onClick={buttonAction}
      className="bg-purple py-4 px-[1.2rem] rounded-3xl text-700 hover:bg-lightPurple"
    >
      {buttonLabel}
    </button>
  );
};
export default ButtonPrimaryLarge;
