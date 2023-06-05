import { boardMobileModalState } from "@/src/atoms/boardsMobileModalAtom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useRecoilState } from "recoil";
import { settingsModalState } from "../../../../atoms/settingsModalAtom";
type ButtonPrimaryBoardsProps = { buttonLabel: string };

const ButtonPrimaryBoards: React.FC<ButtonPrimaryBoardsProps> = ({
  buttonLabel,
}) => {
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [boardMobileModalStates, setBoardMobileModalStates] = useRecoilState(
    boardMobileModalState
  );
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: buttonLabel });
  const activeBoard = settingState.activeBoard;
  const darkMode = settingState.darkMode;
  const switchBoard = () => {
    setSettingState((prev) => ({ ...prev, activeBoard: buttonLabel }));
    if (boardMobileModalStates.open) setBoardMobileModalStates({ open: false });
  };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={switchBoard}
      className={`${
        activeBoard === buttonLabel
          ? "bg-purple text-wwhite"
          : "text-mediumGrey"
      }  flex items-center py-3 px-5 lg:pl-8 rounded-[0px_100px_100px_0px] text-700

       ${
         darkMode ? "hover:bg-white" : "hover:bg-purple hover:bg-opacity-10"
       } hover:text-purple disabled:opacity-25`}
    >
      <MdOutlineSpaceDashboard className="mr-3" /> {buttonLabel}{" "}
    </button>
  );
};
export default ButtonPrimaryBoards;
