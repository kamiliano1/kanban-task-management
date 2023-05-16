import React from "react";

type ButtonSecondaryProps = {
  darkMode: boolean;
  buttonLabel: string;
  cssClasses: string;
};

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  darkMode,
  buttonLabel,
  cssClasses,
}) => {
  return (
    <button
      className={`bg-white text-purple rounded-3xl mb-4 text-500 inline-block py-2 w-full ${cssClasses} ${
        !darkMode && "hover:bg-[rgba(99,_95,_199,_0.25)]"
      }`}
    >
      {buttonLabel}
    </button>
  );
};
export default ButtonSecondary;
