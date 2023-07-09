import { boardMobileModalState } from "@/src/atoms/boardsMobileModalAtom";
import { auth, firestore } from "@/src/firebase/clientApp";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useRecoilState } from "recoil";
import { settingsModalState } from "../../../atoms/settingsModalAtom";
type ButtonPrimaryBoardsProps = { buttonLabel: string };

const ButtonPrimaryBoards: React.FC<ButtonPrimaryBoardsProps> = ({
  buttonLabel,
}) => {
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [boardMobileModalStates, setBoardMobileModalStates] = useRecoilState(
    boardMobileModalState
  );
  const [user] = useAuthState(auth);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: buttonLabel });
  const activeBoard = settingState.activeBoard;
  const darkMode = settingState.darkMode;
  const switchBoard = async () => {
    setSettingState((prev) => ({ ...prev, activeBoard: buttonLabel }));
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        activeBoard: buttonLabel,
      });
    }
    if (boardMobileModalStates.open) setBoardMobileModalStates({ open: false });
  };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <button
      // ref={setNodeRef}
      // style={style}
      // {...attributes}
      // {...listeners}
      onClick={switchBoard}
      className={`${
        activeBoard === buttonLabel ? "bg-purple text-white" : "text-mediumGrey"
      } touch-none flex items-center py-3 px-5 lg:pl-8 rounded-[0px_100px_100px_0px] text-700
       ${
         darkMode ? "hover:bg-white" : "hover:bg-purple hover:bg-opacity-10"
       } hover:text-purple disabled:opacity-25`}
    >
      <MdOutlineSpaceDashboard className="mr-3" /> {buttonLabel}
    </button>
  );
};
export default ButtonPrimaryBoards;
