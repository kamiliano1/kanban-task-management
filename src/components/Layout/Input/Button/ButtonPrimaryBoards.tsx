import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
type ButtonPrimaryBoardsProps = { buttonLabel: string };

const ButtonPrimaryBoards: React.FC<ButtonPrimaryBoardsProps> = ({
  buttonLabel,
}) => {
  return (
    <button
      className="bg-purple flex items-center py-3 px-5 rounded-[0px_100px_100px_0px] text-700
       hover:bg-lightPurple disabled:opacity-25"
    >
      <MdOutlineSpaceDashboard className="mr-3" /> {buttonLabel}
    </button>
  );
};
export default ButtonPrimaryBoards;
