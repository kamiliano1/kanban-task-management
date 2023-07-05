import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { useRecoilState } from "recoil";
import { boardsState } from "../../../atoms/boardsAtom";
import { modalState } from "../../../atoms/modalAtom";
import { settingsModalState } from "../../../atoms/settingsModalAtom";
import ButtonDestructive from "../../Layout/Input/Button/ButtonDestructive";
import ButtonSecondary from "../../Layout/Input/Button/ButtonSecondary";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";

type DeleteBoardModalProps = { darkMode: boolean };

const DeleteBoardModal: React.FC<DeleteBoardModalProps> = ({ darkMode }) => {
  const [user] = useAuthState(auth);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [modalStates, setModalStates] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);

  const deleteBoard = async () => {
    const remainingBoards = boardState.filter((item) => {
      return item.name !== settingState.activeBoard;
    });
    const updatedBoard = boardState.filter(
      (board) => board.name !== settingState.activeBoard
    );
    setBoardState(updatedBoard);
    setModalStates((prev) => ({ ...prev, open: false }));
    setSettingState((prev) => ({
      ...prev,
      activeBoard: remainingBoards.length ? remainingBoards[0].name : "",
    }));
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        board: updatedBoard,
        activeBoard: remainingBoards.length ? remainingBoards[0].name : "",
      });
    }
  };
  return (
    <>
      <Dialog.Title className="text-red text-800 pb-6">
        Delete this board?
      </Dialog.Title>
      <Dialog.Description className={` pb-4 text-500 text-mediumGrey`}>
        Are you sure you want to delete the `{settingState.activeBoard}` board?
        This action will remove all columns and tasks and cannot be reversed.
      </Dialog.Description>
      <div className="sm:flex sm:gap-4">
        <ButtonDestructive buttonLabel="Delete" buttonAction={deleteBoard} />
        <ButtonSecondary
          buttonLabel="Cancel"
          darkMode={darkMode}
          buttonAction={() => {
            setModalStates((prev) => ({ ...prev, open: false }));
          }}
          cssClasses="mt-2 sm:mt-0"
        />
      </div>
    </>
  );
};
export default DeleteBoardModal;
