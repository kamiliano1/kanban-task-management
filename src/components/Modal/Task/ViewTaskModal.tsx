import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Checkbox from "../../Layout/Input/Checkbox";
import DropMenu from "../../Layout/Input/DropMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "../../../atoms/settingsModalAtom";
import { boardsState } from "../../../atoms/boardsAtom";
import {
  BoardType,
  ColumnType,
  SubtasksType,
  TaskType,
} from "../../Board/BoardType";
import { Controller, useForm } from "react-hook-form";

type ViewTaskModalProps = { darkMode: boolean };
interface BoardInputs {
  title: string;
  description: string;
  subtasks: SubtasksType[];
  status: string;
}
const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ darkMode }) => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [loading, setLoading] = useState<boolean>(true);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [currentBoard, setCurrentBoard] = useState<BoardType>();
  const [currrentColumn, setCurrentColumn] = useState<ColumnType>();
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const [completedTask, setCompletedTask] = useState<number | undefined>(0);
  const [columnsName, setColumnsName] = useState<string[]>([]);

  const { control, getValues, reset } = useForm<BoardInputs>();
  const sprawdz = () => {
    // console.log(settingState);
    const currentBoard = boardState.find(
      (item) => item.name === settingState.activeBoard
    );
    setCurrentBoard(
      boardState.find((item) => item.name === settingState.activeBoard)
    );
    setCurrentColumn(
      currentBoard?.columns.find(
        (item) => item.id === settingState.activateColumn
      )
    );
    // const activatedColumn = currentBoard?.columns.find(
    //   (item) => item.id === settingState.activateColumn
    // );
    // const currentTask = currentBoard?.columns.
    setCurrentTask(
      currrentColumn?.tasks.find(
        (item) => item.id === settingState.activateTask
      )
    );
    setCurrentTask(currentTask);
    console.log(currentTask);
    setCompletedTask(
      currentTask?.subtasks.filter((item) => item.isCompleted).length
    );

    console.log(getValues("status"), "wartoscki");
  };
  useEffect(() => {
    // if (loading) {
    const currentBoard = boardState.find(
      (item) => item.name === settingState.activeBoard
    );
    const activatedColumn = currentBoard?.columns.find(
      (item) => item.id === settingState.activateColumn
    );
    if (currentBoard)
      setColumnsName(currentBoard.columns.map((item) => item.name));
    // const currentTask = currentBoard?.columns.
    setCurrentTask(
      activatedColumn?.tasks.find(
        (item) => item.id === settingState.activateTask
      )
    );
    setLoading(false);
    // }
    // setCurrentTask(currentTask);
    // console.log(currentTask?.title);
    setCompletedTask(
      currentTask?.subtasks.filter((item) => item.isCompleted).length
    );
  }, [
    currentTask,
    boardState,
    loading,
    settingState.activateColumn,
    settingState.activateTask,
    settingState.activeBoard,
  ]);
  useEffect(() => {
    if (modalsState.open) setLoading(true);
    reset({ status: "" });
  }, [modalsState, reset]);

  const toggleSubtask = (subTaskId: number) => {
    const updatedSubtask = currentTask?.subtasks.map((item) =>
      item.id === subTaskId ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setBoardState((prev) => {
      return prev.map((board) => {
        if (board.name === settingState.activeBoard) {
          let columns = board.columns;
          const activatedColumn = columns.find(
            (col) => col.id === settingState.activateColumn
          );
          let tasks = activatedColumn?.tasks;
          const activatedTask = tasks?.find(
            (task) => task.id === settingState.activateTask
          );
          const updatedTask = {
            ...(activatedTask as TaskType),
            status: getValues("status"),
            subtasks: updatedSubtask as SubtasksType[],
          };
          console.log(updatedTask);

          tasks = tasks?.map((task) =>
            task.id === settingState.activateTask ? updatedTask : task
          );
          columns = columns.map((col) =>
            col.id === settingState.activateColumn
              ? { ...col, tasks: tasks as TaskType[] }
              : col
          );

          return { ...board, columns: columns };
        }
        return board;
      });
    });
  };

  const checkBox = currentTask?.subtasks.map((item) => (
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
          focus:outline-none`}>
        <Dialog.Title
          className={` ${darkMode ? "text-white" : "text-black"} text-800`}>
          <div className="flex items-center">
            <p> {currentTask?.title}</p>
          </div>
        </Dialog.Title>
        <Dialog.Description className="text-mediumGrey my-[1.5rem] text-500">
          {currentTask?.description}
        </Dialog.Description>
        <Dialog.Description
          className={` pb-4 text-500 ${
            darkMode ? "text-white" : "text-mediumGrey"
          }`}>
          Subtasks ({completedTask} of {currentTask?.subtasks.length})
        </Dialog.Description>
        {checkBox}
        <p
          className={` text-400 pt-4 pb-2 ${
            darkMode ? "text-white" : "text-mediumGrey"
          }`}>
          Current Status
        </p>
        <Controller
          control={control}
          name="status"
          defaultValue={columnsName[0]}
          render={({ field: { onChange, value, ref } }) => (
            <DropMenu
              darkMode={darkMode}
              onChange={onChange}
              value={value}
              columnsName={columnsName}
              ref={ref}
            />
          )}
        />
        <button onClick={sprawdz}>kkkkk</button>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default ViewTaskModal;
