import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Checkbox from "../../Layout/Input/Checkbox";
import DropMenu from "../../Layout/Input/DropMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "../../../atoms/settingsModalAtom";
import { boardsState } from "../../../atoms/boardsAtom";
import { SubtasksType, TaskType } from "../../Board/BoardType";

type ViewTaskModalProps = { darkMode: boolean };

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ darkMode }) => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [loading, setLoading] = useState<boolean>(true);
  const [boardState, setBoardState] = useRecoilState(boardsState);

  const [activatedTask, setActivatedTask] = useState<TaskType>();
  const [completedTask, setCompletedTask] = useState<number>(0);

  const sprawdz = () => {
    // console.log(settingState);
    const currentBoard = boardState.find(
      (item) => item.name === settingState.activeBoard
    );
    const activatedColumn = currentBoard?.columns.find(
      (item) => item.id === settingState.activateColumn
    );
    // const currentTask = currentBoard?.columns.
    setActivatedTask(
      activatedColumn?.tasks.find(
        (item) => item.id === settingState.activateTask
      )
    );
    setActivatedTask(activatedTask);
    console.log(activatedTask);
    setCompletedTask(
      activatedTask!.subtasks.filter((item) => item.isCompleted).length
    );
  };
  useEffect(() => {
    if (loading) {
      const currentBoard = boardState.find(
        (item) => item.name === settingState.activeBoard
      );
      const activatedColumn = currentBoard?.columns.find(
        (item) => item.id === settingState.activateColumn
      );
      // const currentTask = currentBoard?.columns.
      setActivatedTask(
        activatedColumn?.tasks.find(
          (item) => item.id === settingState.activateTask
        )
      );
      setLoading(false);
    }
    // setActivatedTask(activatedTask);
    // console.log(activatedTask?.title);
    setCompletedTask(
      activatedTask!.subtasks.filter((item) => item.isCompleted).length
    );
  }, [
    activatedTask,
    boardState,
    loading,
    settingState.activateColumn,
    settingState.activateTask,
    settingState.activeBoard,
  ]);
  useEffect(() => {
    if (modalsState.open) setLoading(true);
  }, [modalsState]);
  const toggleSubtask = (subTaskId: number) => {
    const updatedSubtask = activatedTask?.subtasks.map((item) =>
      item.id === subTaskId ? { ...item, isCompleted: !item.isCompleted } : item
    );
    // console.log(updatedSubtask);
    console.log(activatedTask?.subtasks);
    console.log(updatedSubtask);

    setActivatedTask((prev) => {
      return { ...prev, subtasks: updatedSubtask };
    });
    // setActivatedTask({
    //   description: "",
    //   id: 11,
    //   status: "",
    //   subtasks: updatedSubtask,
    //   title: "",
    // });
    // console.log(tests);

    // console.log(activatedTask?.subtasks[0]);
  };

  const checkBox = activatedTask?.subtasks.map((item) => (
    <Checkbox
      key={item.id}
      darkMode={darkMode}
      checkboxLabel={item.title}
      subTaskId={item.id}
      isCompleted={item.isCompleted}
      toggleSubtask={toggleSubtask}
    />
  ));
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="bg-blackA9 data-[state=open]:animate-overlayShow 
      fixed inset-0"
      />
      <Dialog.Content
        className={`data-[state=open]:animate-contentShow 
        fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px]
         translate-x-[-50%] translate-y-[-50%] rounded-[6px] z-[30] ${
           darkMode ? "bg-darkGrey" : "bg-white"
         }
          p-[25px] 
          shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
          focus:outline-none`}
      >
        <Dialog.Title
          className={` ${darkMode ? "text-white" : "text-black"} text-800`}
        >
          <div className="flex items-center">
            <p> {activatedTask?.title}</p>
          </div>
        </Dialog.Title>
        <Dialog.Description className="text-mediumGrey my-[1.5rem] text-500">
          {activatedTask?.description}
        </Dialog.Description>
        <Dialog.Description
          className={` pb-4 text-500 ${
            darkMode ? "text-white" : "text-mediumGrey"
          }`}
        >
          Subtasks ({completedTask} of {activatedTask?.subtasks.length})
        </Dialog.Description>
        {checkBox}
        <p
          className={` text-400 pt-4 pb-2 ${
            darkMode ? "text-white" : "text-mediumGrey"
          }`}
        >
          Current Status
        </p>
        <button onClick={sprawdz}>kkkkk</button>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default ViewTaskModal;
