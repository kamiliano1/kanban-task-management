import { modalState } from "@/src/atoms/modalAtom";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { boardsState } from "../../../atoms/boardsAtom";
import { settingsModalState } from "../../../atoms/settingsModalAtom";
import { BoardType, SubtasksType, TaskType } from "../../Board/BoardType";
import Checkbox from "../../Layout/Input/Checkbox";
import DropMenu from "../../Layout/Input/DropMenu";
import TaskDropDownMenu from "./TaskDropDownMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
type ViewTaskModalProps = { darkMode: boolean };
interface BoardInputs {
  title: string;
  description: string;
  subtasks: SubtasksType[];
  status: string;
}
const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ darkMode }) => {
  const [user] = useAuthState(auth);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [loading, setLoading] = useState<boolean>(true);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [targetColumnId, setTargetColumnId] = useState<number>();
  const [targetTaskId, setTargetTaskId] = useState<number>();
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const [completedTask, setCompletedTask] = useState<number | undefined>(0);
  const [columnsName, setColumnsName] = useState<string[]>([]);
  const [activateColumn, setActivatedColumn] = useState<string | undefined>("");
  const [isUpdatedTask, setIsUpdatedTask] = useState<boolean>(false);
  const { control, reset, watch } = useForm<BoardInputs>();
  const [taskTimmer, setTaskTimer] = useState<number>(0);
  const [tasksList, setTasksList] = useState<number[]>([]);
  useEffect(() => {
    setActivatedColumn(
      boardState
        .find((board) => board.name === settingState.activeBoard)
        ?.columns.find((task) => task.id === settingState.activateColumn)?.name
    );
  }, [boardState, settingState.activateColumn, settingState.activeBoard]);
  useEffect(() => {
    const currentBoard = boardState.find(
      (item) => item.name === settingState.activeBoard
    );
    const activatedColumn = currentBoard?.columns.find(
      (item) => item.id === settingState.activateColumn
    );
    if (currentBoard)
      setColumnsName(currentBoard.columns.map((item) => item.name));
    setCurrentTask(
      activatedColumn?.tasks.find(
        (item) => item.id === settingState.activateTask
      )
    );
    setLoading(false);
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
      reset({ status: "" });
    }
  }, [activateColumn, modalsState, reset]);

  const toggleSubtask = async (subTaskId: number) => {
    setTaskTimer(0);
    const updatedSubtask = currentTask?.subtasks.map((item) =>
      item.id === subTaskId ? { ...item, isCompleted: !item.isCompleted } : item
    );

    const updatedBoard = boardState.map((board) => {
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
    setBoardState(updatedBoard);

    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        board: updatedBoard,
      });
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const updateStatus = async () => {
    setIsUpdatedTask(true);
    const updatedBoard = boardState.map((board) => {
      if (board.name === settingState.activeBoard) {
        let columns = board.columns;
        let targetColumn = columns.find(
          (cols) => cols.name === watch("status")[0]
        );
        let activatedColumn = columns.find(
          (cols) => cols.id === settingState.activateColumn
        );
        let targetTasks = targetColumn?.tasks;
        let activatedTasks = activatedColumn?.tasks;
        let taskToMove = activatedTasks?.find(
          (task) => task.id === settingState.activateTask
        );
        taskToMove = {
          ...(taskToMove as TaskType),
          status: watch("status")[0],
        };
        targetTasks = [...(targetTasks as TaskType[]), taskToMove as TaskType];
        activatedTasks = activatedTasks?.filter(
          (task) => task.id !== taskToMove?.id
        );
        setTargetColumnId(targetColumn?.id);
        setTargetTaskId(taskToMove.id);
        if (activatedColumn?.name === targetColumn?.name) return board;
        columns = columns.map((cols) => {
          if (cols.name === watch("status")[0])
            return { ...cols, tasks: targetTasks as TaskType[] };
          if (cols.id === settingState.activateColumn)
            return { ...cols, tasks: activatedTasks as TaskType[] };
          return cols;
        });
        return { ...board, columns: columns };
      }
      return board;
    });
    setBoardState(updatedBoard);
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        board: updatedBoard,
      });
    }
  };
  useEffect(() => {
    if (isUpdatedTask) {
      setSettingState((prev) => ({
        ...prev,
        activateColumn: targetColumnId as number,
        activateTask: targetTaskId as number,
      }));
      setIsUpdatedTask(false);
    }
  }, [
    isUpdatedTask,
    modalsState.view,
    setSettingState,
    targetColumnId,
    targetTaskId,
  ]);

  useEffect(() => {
    // setTasksList(currentTask?.subtasks?.map((subtask) => subtask.title));
    if (currentTask?.subtasks.length)
      setTasksList(currentTask?.subtasks?.map((sub) => sub.id));
    // console.log(tasksList);
  }, [currentTask?.subtasks]);

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

  const handleDragDrop = async (e: DragEndEvent) => {
    if (e.active.id === e.over?.id) return;
    const updatedBoard = boardState.map((board) => {
      if (board.name === settingState.activeBoard) {
        let columns = board.columns;
        const activatedColumn = columns.find(
          (col) => col.id === settingState.activateColumn
        );
        let tasks = activatedColumn?.tasks;
        const activatedTask = tasks?.find(
          (task) => task.id === settingState.activateTask
        );

        const currentSubtask = currentTask?.subtasks as SubtasksType[];
        const activateSubtask = currentTask?.subtasks?.findIndex(
          (subtask) => subtask.id === e.active.id
        ) as number;
        const targetSubtask = currentTask?.subtasks?.findIndex(
          (subtask) => subtask.id === e.over?.id
        ) as number;
        const updatedSubtask = arrayMove(
          currentSubtask,
          activateSubtask,
          targetSubtask
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

    setBoardState(updatedBoard);
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        board: updatedBoard,
      });
    }
  };
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
          <div className="flex items-center justify-between">
            <p> {currentTask?.title}</p>
            <TaskDropDownMenu />
          </div>
        </Dialog.Title>
        <Dialog.Description className="text-mediumGrey my-[1.5rem] text-500">
          {currentTask?.description}
        </Dialog.Description>
        <Dialog.Description
          className={` pb-4 text-500 ${
            darkMode ? "text-white" : "text-mediumGrey"
          }`}
        >
          Subtasks ({completedTask} of {currentTask?.subtasks.length})
        </Dialog.Description>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragDrop}
          sensors={sensors}
        >
          <SortableContext
            items={tasksList}
            // strategy={verticalListSortingStrategy}
          >
            {checkBox}
          </SortableContext>
        </DndContext>
        <p
          className={` text-400 pt-4 pb-2 ${
            darkMode ? "text-white" : "text-mediumGrey"
          }`}
        >
          Current Status
        </p>
        <Controller
          control={control}
          name="status"
          defaultValue={activateColumn}
          render={({ field: { onChange, value, ref } }) => (
            <DropMenu
              darkMode={darkMode}
              onChange={(...event: any[]) => {
                onChange(event);
                setActivatedColumn(event[0]);
                updateStatus();
              }}
              value={activateColumn ? activateColumn : value}
              columnsName={columnsName}
              ref={ref}
            />
          )}
        />
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default ViewTaskModal;
