import React from "react";

type ButtonPrimaryLargeProps = {
  buttonLabel: string;
  buttonAction: () => void;
  isDisabled?: boolean;
};

const ButtonPrimaryLarge: React.FC<ButtonPrimaryLargeProps> = ({
  buttonLabel,
  buttonAction,
  isDisabled,
}) => {
  return (
    <button
      onClick={buttonAction}
      className={`bg-purple py-3 px-7 rounded-3xl text-700 text-white
       hover:bg-lightPurple
       ${!isDisabled && "hover:bg-lightPurple"} disabled:opacity-25 inline-block
       `}
    >
      {buttonLabel}
    </button>
  );
};
export default ButtonPrimaryLarge;
