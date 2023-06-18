import { Spinner } from "@/public/Spinner";
import React from "react";

type ButtonPrimarySmallProps = {
  buttonLabel: string;
  buttonAction?: () => void;
  isDisabled?: boolean;
  loading?: boolean;
};

const ButtonPrimarySmall: React.FC<ButtonPrimarySmallProps> = ({
  buttonLabel,
  buttonAction,
  isDisabled,
  loading,
}) => {
  return (
    <div>
      <button
        disabled={isDisabled}
        type="submit"
        onClick={buttonAction}
        className={`bg-purple rounded-3xl text-500 py-2 sm:py-[.95rem]
      ${!isDisabled && "hover:bg-lightPurple"} disabled:opacity-25 inline-block
     w-full`}
      >
        {loading ? <Spinner className="mx-auto text-[1.5rem]" /> : buttonLabel}
      </button>
    </div>
  );
};
export default ButtonPrimarySmall;
