import React from "react";

type ButtonPrimarySmallProps = {
  buttonLabel: string;
  buttonAction: () => void;
  isDisabled?: boolean;
};

const ButtonPrimarySmall: React.FC<ButtonPrimarySmallProps> = ({
  buttonLabel,
  buttonAction,
  isDisabled,
}) => {
  return (
    <button
      disabled={isDisabled}
      type="submit"
      onClick={buttonAction}
      className={`bg-purple rounded-3xl text-500 py-2
      ${!isDisabled && "hover:bg-lightPurple"} disabled:opacity-25 inline-block
     w-full`}>
      {buttonLabel}
    </button>
  );
};
export default ButtonPrimarySmall;
