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
  const [targetColumnId, setTargetColumnId] = useState<number>();
  const [targetTaskId, setTargetTaskId] = useState<number>();
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const [completedTask, setCompletedTask] = useState<number | undefined>(0);
  const [columnsName, setColumnsName] = useState<string[]>([]);
  const [activateColumn, setActivatedColumn] = useState<string | undefined>("");

  const { control, getValues, reset, watch } = useForm<BoardInputs>();

  const sprawdz = () => {
    console.log(settingState.activateColumn, "aktywana kolumna");
    console.log(targetColumnId, "kolumnaId");

    console.log(settingState.activateTask, "aktywana task");
    console.log(targetTaskId, "TaskId");
    // setActivatedColumn(
    //   boardState
    //     .find((board) => board.name === settingState.activeBoard)
    //     ?.columns.find((task) => task.id === settingState.activateColumn)?.name
    // );
    // console.log(activateColumn, "kolumn y");
    // console.log(settingState, "ustawienia");
    // console.log(boardState[0].columns[1].id, "id kolumny");
    // console.log(boardState[0].columns[1].tasks[0].id, "id taska");
    // setSettingState((prev) => ({
    //   ...prev,
    //   activateColumn: boardState[0].columns[1].id,
    //   activateTask: boardState[0].columns[1].tasks[0].id,
    // }));
    // console.log(boardState[0].columns[0].tasks[0].status);
    // console.log(settingState.activateColumn);
    // console.log(
    //   boardState
    //     .find((board) => board.name === settingState.activeBoard)
    //     ?.columns.find((task) => task.id === settingState.activateColumn)?.name
    // );
    // console.log(settingState);
    // const currentBoard = boardState.find(
    //   (item) => item.name === settingState.activeBoard
    // );
    // setCurrentBoard(
    //   boardState.find((item) => item.name === settingState.activeBoard)
    // );
    // setCurrentColumn(
    //   currentBoard?.columns.find(
    //     (item) => item.id === settingState.activateColumn
    //   )
    // );
    // // const activatedColumn = currentBoard?.columns.find(
    // //   (item) => item.id === settingState.activateColumn
    // // );
    // // const currentTask = currentBoard?.columns.
    // setCurrentTask(
    //   currrentColumn?.tasks.find(
    //     (item) => item.id === settingState.activateTask
    //   )
    // );
    // setCurrentTask(currentTask);
    // console.log(currentTask);
    // setCompletedTask(
    //   currentTask?.subtasks.filter((item) => item.isCompleted).length
    // );
  };

  useEffect(() => {
    setActivatedColumn(
      boardState
        .find((board) => board.name === settingState.activeBoard)
        ?.columns.find((task) => task.id === settingState.activateColumn)?.name
    );
    // console.log("aktualizacaj kolumny");
  }, [boardState, settingState.activateColumn, settingState.activeBoard]);
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
    // console.log(currentTask?.status, "aa");
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
    if (!modalsState.open) {
      setLoading(true);
      // reset({ status: activateColumn });
    }
  }, [activateColumn, modalsState, reset]);

  const toggleSubtask = (subTaskId: number) => {
    console.log(settingState.activateColumn, "aktywana kolumna");
    console.log(targetColumnId, "kolumnaId");

    console.log(settingState.activateTask, "aktywana task");
    console.log(targetTaskId, "TaskId");

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
            subtasks: updatedSubtask as SubtasksType[],
          };
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
  const updateStatus = () => {
    // setBoardState((prev) => {
    //   return prev.map((board) => {
    //     if (board.name === settingState.activeBoard) {
    //       let columns = board.columns;
    //       let targetColumn = columns.find(
    //         (cols) => cols.name === watch("status")[0]
    //       );

    //       let activatedColumn = columns.find(
    //         (cols) => cols.id === settingState.activateColumn
    //       );
    //       let targetTasks = targetColumn?.tasks;
    //       let activatedTasks = activatedColumn?.tasks;
    //       let taskToMove = activatedTasks?.find(
    //         (task) => task.id === settingState.activateTask
    //       );
    //       taskToMove = {
    //         ...(taskToMove as TaskType),
    //         status: watch("status")[0],
    //       };
    //       targetTasks = [
    //         ...(targetTasks as TaskType[]),
    //         taskToMove as TaskType,
    //       ];
    //       activatedTasks = activatedTasks?.filter(
    //         (task) => task.id !== taskToMove?.id
    //       );
    //       // setTargetColumnId(targetColumn?.id);
    //       // setTargetTaskId(taskToMove.id);
    //       // console.log(activatedColumn?.name, targetColumn?.name);
    //       if (activatedColumn?.name === targetColumn?.name) return board;
    //       columns = columns.map((cols) => {
    //         if (cols.name === watch("status")[0])
    //           return { ...cols, tasks: targetTasks as TaskType[] };
    //         if (cols.id === settingState.activateColumn)
    //           return { ...cols, tasks: activatedTasks as TaskType[] };
    //         return cols;
    //       });
    //       return { ...board, columns: columns };
    //       return board;
    //     }
    //     return board;
    //   });
    // });
    console.log(settingState);

    // setSettingState((prev) => ({
    //   ...prev,
    //   activateColumn: targetColumnId as number,
    //   activateTask: targetTaskId as number,
    // }));
    console.log(settingState);
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
            <p>
              {" "}
              {currentTask?.title} {activateColumn}
            </p>
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
        <input list="browsers">
          <datalist id="browsers">
            <option value="Internet Explorer" />
            <option value="Firefox" />
            <option value="Google Chrome" />
            <option value="Opera" />
            <option value="Safari" />
          </datalist>
        </input>
        <Controller
          control={control}
          name="status"
          defaultValue={"activateColumn"}
          render={({ field: { onChange, value, ref } }) => (
            <DropMenu
              darkMode={darkMode}
              onChange={(...event: any[]) => {
                onChange(event);
                setActivatedColumn(event[0]);
                updateStatus();
              }}
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
