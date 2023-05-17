import React from "react";

type ButtonSecondaryProps = {
  darkMode: boolean;
  buttonLabel: string;
  cssClasses: string;
  buttonAction: () => void;
};

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  darkMode,
  buttonLabel,
  cssClasses,
  buttonAction,
}) => {
  return (
    <button
      onClick={buttonAction}
      className={`bg-white text-purple rounded-3xltext-500 inline-block py-2 w-full ${cssClasses} ${
        !darkMode && "hover:bg-[rgba(99,_95,_199,_0.25)]"
      }`}
    >
      {buttonLabel}
    </button>
  );
};
export default ButtonSecondary;
