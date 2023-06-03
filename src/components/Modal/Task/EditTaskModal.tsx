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
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [targetColumnId, setTargetColumnId] = useState<number>();

  const [targetTaskId, setTargetTaskId] = useState<number>();
  const [isUpdatedTask, setIsUpdatedTask] = useState<boolean>(false);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [errorBoardName, setErrorBoardName] = useState<string>("");
  const [columnsName, setColumnsName] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activateColumn, setActivatedColumn] = useState<string | undefined>("");
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const [temporaryBoard, setTemporaryBoard] = useState(boardState);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    setError,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<BoardInputs>();
  useEffect(() => {
    setActivatedColumn(
      boardState
        .find((board) => board.name === settingState.activeBoard)
        ?.columns.find((task) => task.id === settingState.activateColumn)?.name
    );
  }, [boardState, settingState.activateColumn, settingState.activeBoard]);
  const aktualizacja = () => {};
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
    if (loading) {
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
    currentTask?.description,
    currentTask?.status,
    currentTask?.subtasks,
    currentTask?.title,
    loading,
    setValue,
    settingState.activateColumn,
    settingState.activateTask,
    settingState.activeBoard,
  ]);

  const updateStatus = () => {
    setIsUpdatedTask(true);

    setTemporaryBoard(
      boardState.map((board) => {
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
          targetTasks = [
            ...(targetTasks as TaskType[]),
            taskToMove as TaskType,
          ];
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
      })
    );

    setBoardState((prev) => {
      return prev.map((board) => {
        if (board.name === settingState.activeBoard) {
          let columns = board.columns;
          let targetColumn = columns.find(
            (cols) => cols.name === watch("status")
          );
          // console.log(targetColumn);

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
          targetTasks = [
            ...(targetTasks as TaskType[]),
            taskToMove as TaskType,
          ];
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
          // return board;
        }
        return board;
      });
    });
  };

  useEffect(() => {
    if (isUpdatedTask) {
      setSettingState((prev) => ({
        ...prev,
        activateColumn: targetColumnId as number,
        activateTask: targetTaskId as number,
      }));
      setModalsState((prev) => ({ ...prev, view: "viewTask" }));
      setIsUpdatedTask(false);
    }
  }, [
    isUpdatedTask,
    modalsState.view,
    setModalsState,
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
  const onSubmit: SubmitHandler<BoardInputs> = (data) => {
    setIsUpdatedTask(true);
    updateStatus();
    const updatedSubtasks = currentTask?.subtasks.map((subtask) => {
      return { ...subtask, title: data.subtasks[subtask.id].title };
    });
    const editedTask = {
      title: data.title,
      status: data.status,
      description: data.description,
      id: currentTask?.id as number,
      subtasks: updatedSubtasks as SubtasksType[],
    };

    setBoardState((prev) =>
      prev.map((board) => {
        if (board.name === settingState.activeBoard) {
          const activatedColumns = board.columns.map((col) => {
            if (col.name === getValues("status")) {
              console.log(col.tasks, "task");
              const updatedTask = col.tasks.map((task) => {
                if (task.id === editedTask?.id) {
                }
                return task.id === editedTask?.id ? editedTask : task;
              });
              return { ...col, tasks: updatedTask };
            }
            return col;
          });
          return { ...board, columns: activatedColumns };
        }
        return board;
      })
    );
  };

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
    <Dialog.Portal>
      <Dialog.Content
        className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px]
     translate-x-[-50%] translate-y-[-50%] rounded-[6px] z-[30] ${
       darkMode ? "bg-darkGrey" : "bg-white"
     }
      p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
      focus:outline-none`}>
        <Dialog.Title
          className={` ${
            darkMode ? "text-white" : "text-black"
          } text-800 pb-4`}>
          Edit Task
        </Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-400 pb-2">Title</p>
          <div className="relative">
            <input
              placeholder="e.g. Take coffee break"
              className={`text-500 placeholder:text-black
            FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px] mb-5
             ${
               errors.title || errorBoardName
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
            <p className="text-400 pb-2">Description</p>
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
            <p className="text-400 pb-2">Subtasks</p>
            {activateColumn}
          </div>
          {subTasks}
          <ButtonSecondary
            darkMode={darkMode}
            buttonLabel="+ Add New Subtask"
            cssClasses="mb-6"
            buttonAction={addSubTask}
          />
          <p className="text-400 pb-2">Status</p>
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
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default EditTaskModal;
