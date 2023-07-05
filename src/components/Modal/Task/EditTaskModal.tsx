import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "@/src/atoms/settingsModalAtom";
import * as Dialog from "@radix-ui/react-dialog";
import { customAlphabet } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { boardsState } from "../../../atoms/boardsAtom";
import { BoardType, SubtasksType, TaskType } from "../../Board/BoardType";
import ButtonPrimarySmall from "../../Layout/Input/Button/ButtonPrimarySmall";
import ButtonSecondary from "../../Layout/Input/Button/ButtonSecondary";
import DropMenu from "../../Layout/Input/DropMenu";
import AddSubTaskInput from "./AddSubTaskInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const nanoid = customAlphabet("1234567890", 15);
type EditTaskModalProps = {
  darkMode: boolean;
};
interface BoardInputs {
  title: string;
  description: string;
  subtasks: SubtasksType[];
  status: string;
}
const EditTaskModal: React.FC<EditTaskModalProps> = ({ darkMode }) => {
  const [user] = useAuthState(auth);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [targetColumnId, setTargetColumnId] = useState<number>();
  const [targetTaskId, setTargetTaskId] = useState<number>();
  const [isUpdatedTask, setIsUpdatedTask] = useState<boolean>(false);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [columnsName, setColumnsName] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newBoard, setNewBoard] = useState<BoardType[]>([]);
  const [activateColumn, setActivateColumn] = useState<string | undefined>("");
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const [tasksList, setTasksList] = useState<number[]>([]);
  const loaded = useRef(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<BoardInputs>();
  useEffect(() => {
    if (loading) {
      setActivateColumn(
        boardState
          .find((board) => board.name === settingState.activeBoard)
          ?.columns.find((task) => task.id === settingState.activateColumn)
          ?.name
      );
      const currentBoard = boardState.find(
        (item) => item.name === settingState.activeBoard
      );
      const activatedColumn = currentBoard?.columns.find(
        (item) => item.id === settingState.activateColumn
      );
      if (currentBoard) {
        setColumnsName(currentBoard.columns.map((item) => item.name));
        setCurrentTask(
          activatedColumn?.tasks.find(
            (item) => item.id === settingState.activateTask
          )
        );
        setCurrentTask((prev) => ({
          ...(prev as TaskType),
          status: activatedColumn?.name as string,
        }));

        setNewBoard(boardState);
        setValue("title", currentTask?.title as string);
        setValue("description", currentTask?.description as string);
        setValue("status", currentTask?.status as string);
        currentTask?.subtasks.map((subtask) => {
          setValue(`subtasks.${subtask.id}.title`, subtask.title);
        });
      }
      if (currentTask) setLoading(false);
    }
  }, [
    boardState,
    currentTask,
    loading,
    setValue,
    settingState.activateColumn,
    settingState.activateTask,
    settingState.activeBoard,
  ]);
  useEffect(() => {
    if (currentTask?.subtasks.length)
      setTasksList(currentTask?.subtasks?.map((sub) => sub.id));
  }, [currentTask?.subtasks]);

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
    setBoardState,
    setSettingState,
    targetColumnId,
    targetTaskId,
  ]);
  const addSubTask = () => {
    const subTaskId = parseInt(nanoid());
    setCurrentTask((task) => ({
      ...(task as TaskType),
      subtasks: [
        ...(task?.subtasks as SubtasksType[]),
        { title: "", isCompleted: false, id: subTaskId },
      ],
    }));
  };
  const deleteSubTask = (subTaskId: number) => {
    const updatedColumns = currentTask?.subtasks.filter(
      (item) => item.id !== subTaskId
    );
    setCurrentTask((prev) => ({
      ...(prev as TaskType),
      subtasks: updatedColumns as SubtasksType[],
    }));
  };
  const onSubmit: SubmitHandler<BoardInputs> = async (data) => {
    const updatedSubtasks = currentTask?.subtasks.map((subtask) => {
      return { ...subtask, title: data.subtasks[subtask.id].title };
    });
    const currentBoard = boardState.find(
      (item) => item.name === settingState.activeBoard
    );
    const activatedColumn = currentBoard?.columns.find(
      (item) => item.id === settingState.activateColumn
    );

    const editedTask = {
      title: data.title,
      status: data.status ? data.status : (activatedColumn?.name as string),
      description: data.description,
      id: currentTask?.id as number,
      subtasks: updatedSubtasks as SubtasksType[],
    };
    const updatedBoard = boardState.map((board) => {
      if (board.name === settingState.activeBoard) {
        const activatedColumns = board.columns.map((col) => {
          if (col.name === getValues("status")) {
            const updatedTask = col.tasks.map((task) => {
              return task.id === editedTask?.id ? editedTask : task;
            });
            return { ...col, tasks: updatedTask };
          }
          return col;
        });
        return { ...board, columns: activatedColumns };
      }
      return board;
    });
    updateStatus(updatedBoard, editedTask);
    setTimeout(() => {
      setModalsState((prev) => ({ ...prev, view: "viewTask" }));
    }, 10);
    loaded.current = true;
  };

  useEffect(() => {
    loaded.current && setBoardState(newBoard);
  }, [newBoard, setBoardState]);

  const updateStatus = async (
    updatedBoard: BoardType[],
    editedTask?: TaskType
  ) => {
    setIsUpdatedTask(true);
    const updatedBoardd = updatedBoard.map((board) => {
      if (board.name === settingState.activeBoard) {
        let columns = board.columns;
        let targetColumn = columns.find(
          (cols) => cols.name === watch("status")
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
          status: watch("status"),
        };
        targetTasks = [...(targetTasks as TaskType[]), editedTask as TaskType];
        activatedTasks = activatedTasks?.filter(
          (task) => task.id !== taskToMove?.id
        );
        setTargetColumnId(targetColumn?.id);
        setTargetTaskId(taskToMove.id);
        if (activatedColumn?.name === targetColumn?.name) return board;
        columns = columns.map((cols) => {
          if (cols.name === watch("status"))
            return { ...cols, tasks: targetTasks as TaskType[] };
          if (cols.id === settingState.activateColumn)
            return { ...cols, tasks: activatedTasks as TaskType[] };
          return cols;
        });
        return { ...board, columns: columns };
      }
      return board;
    });
    setBoardState(updatedBoardd);
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        board: updatedBoardd,
      });
    }
  };
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
        setCurrentTask(updatedTask);
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
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const subTasks = currentTask?.subtasks.map((item, number) => (
    <AddSubTaskInput
      key={item.id}
      darkMode={darkMode}
      subtasks={item}
      deleteSubTask={deleteSubTask}
      errors={errors}
      register={register}
      number={number}
    />
  ));
  return (
    <>
      <Dialog.Title
        className={` ${darkMode ? "text-white" : "text-black"} text-800 pb-4`}
      >
        Edit Task
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p
          className={`text-400 pb-2 ${darkMode ? "text-white" : "text-black"}`}
        >
          Title
        </p>
        <div className="relative">
          <input
            placeholder="e.g. Take coffee break"
            className={`text-500 placeholder:text-black
            FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px] mb-5
             ${
               errors.title
                 ? "border-red"
                 : "border-[rgba(130,_143,_163,_0.25)]"
             }
              w-full ${
                darkMode
                  ? "text-white bg-[#2B2C37] placeholder:text-white"
                  : "text-black placeholder:text-black"
              }`}
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && (
            <span className="absolute text-red text-500 left-[70%] top-[.6rem]">
              Can`t be empty
            </span>
          )}
          <p
            className={`text-400 pb-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Description
          </p>
          <textarea
            className={`text-500 placeholder:text-black w-full h-[112px]
                        FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px] 
                         border-[rgba(130,_143,_163,_0.25)] mb-5 ${
                           darkMode
                             ? "text-white bg-[#2B2C37] placeholder:text-white"
                             : "text-black placeholder:text-black"
                         }`}
            placeholder="e.g. It`s always good to take a break. This 15 minute break will 
            recharge the batteries a little."
            {...register("description", {
              required: false,
            })}
          />
          <p
            className={`text-400 pb-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Subtasks
          </p>
        </div>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragDrop}
          sensors={sensors}
        >
          <SortableContext
            items={tasksList}
            strategy={verticalListSortingStrategy}
          >
            <div className="overflow-auto scrollbar overflow-x-clip pr-1 max-h-[200px] mb-4">
              {subTasks}
            </div>
          </SortableContext>
        </DndContext>

        <ButtonSecondary
          darkMode={darkMode}
          buttonLabel="+ Add New Subtask"
          cssClasses="mb-6"
          buttonAction={addSubTask}
        />
        <p
          className={`text-400 pb-2 ${darkMode ? "text-white" : "text-black"}`}
        >
          Status
        </p>
        <Controller
          control={control}
          name="status"
          defaultValue={activateColumn}
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
        <ButtonPrimarySmall
          buttonLabel="Save Changes"
          buttonAction={() => handleSubmit(onSubmit)}
        />
      </form>
    </>
  );
};
export default EditTaskModal;
