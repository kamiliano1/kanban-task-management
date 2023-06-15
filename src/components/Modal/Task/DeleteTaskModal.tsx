import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { useRecoilState } from "recoil";
import { boardsState } from "../../../atoms/boardsAtom";
import { modalState } from "../../../atoms/modalAtom";
import { settingsModalState } from "../../../atoms/settingsModalAtom";
import { TaskType } from "../../Board/BoardType";
import ButtonDestructive from "../../Layout/Input/Button/ButtonDestructive";
import ButtonSecondary from "../../Layout/Input/Button/ButtonSecondary";
import { auth, firestore } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";

type DeleteTaskModalProps = { darkMode: boolean };

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ darkMode }) => {
  const [user] = useAuthState(auth);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [modalStates, setModalStates] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const deleteTask = async () => {
    const updatedBoard = boardState.map((board) => {
      if (board.name === settingState.activeBoard) {
        let columns = board.columns;

        let activatedColumn = columns.find(
          (cols) => cols.id === settingState.activateColumn
        );
        let remainingTasks = activatedColumn?.tasks;

        remainingTasks = remainingTasks?.filter(
          (task) => task.id !== settingState.activateTask
        );
        columns = columns.map((cols) => {
          if (cols.id === settingState.activateColumn)
            return { ...cols, tasks: remainingTasks as TaskType[] };
          return cols;
        });
        return { ...board, columns: columns };
      }
      return board;
    });
    // setBoardState((prev) => {
    //   return prev.map((board) => {
    //     if (board.name === settingState.activeBoard) {
    //       let columns = board.columns;

    //       let activatedColumn = columns.find(
    //         (cols) => cols.id === settingState.activateColumn
    //       );
    //       let remainingTasks = activatedColumn?.tasks;

    //       remainingTasks = remainingTasks?.filter(
    //         (task) => task.id !== settingState.activateTask
    //       );
    //       columns = columns.map((cols) => {
    //         if (cols.id === settingState.activateColumn)
    //           return { ...cols, tasks: remainingTasks as TaskType[] };
    //         return cols;
    //       });
    //       return { ...board, columns: columns };
    //     }
    //     return board;
    //   });
    // });
    setBoardState(updatedBoard);
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        board: updatedBoard,
      });
    }
    setModalStates((prev) => ({ ...prev, open: false }));
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content
        className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] z-[500] max-w-[450px]
         translate-x-[-50%] translate-y-[-50%] rounded-[6px] ${
           darkMode ? "bg-darkGrey" : "bg-white"
         }
          p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
          focus:outline-none`}>
        <Dialog.Title className="text-red text-800  pb-6">
          Delete this task?
        </Dialog.Title>
        <Dialog.Description className={` pb-4 text-500 text-mediumGrey`}>
          Are you sure you want to delete the `{settingState.activateTaskName}`
          task and its subtasks? This action cannot be reversed.
        </Dialog.Description>
        <div className="sm:flex sm:gap-4">
          <ButtonDestructive buttonLabel="Delete" buttonAction={deleteTask} />
          <ButtonSecondary
            buttonLabel="Cancel"
            darkMode={darkMode}
            buttonAction={() => {
              setModalStates((prev) => ({ ...prev, view: "viewTask" }));
            }}
            cssClasses="mt-2 sm:mt-0"
          />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default DeleteTaskModal;
