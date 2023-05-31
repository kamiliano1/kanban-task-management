import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "@/src/atoms/settingsModalAtom";
import * as Dialog from "@radix-ui/react-dialog";
import { customAlphabet } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { boardsState } from "../../../atoms/boardsAtom";
import { SubtasksType, TaskType } from "../../Board/BoardType";
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
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [errorBoardName, setErrorBoardName] = useState<string>("");
  const [columnsName, setColumnsName] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activateColumn, setActivatedColumn] = useState<string | undefined>("");
  const [currentTask, setCurrentTask] = useState<TaskType>();
  const firstNameRef = useRef<HTMLInputElement | null>(null);
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
  const [newTask, setNewTask] = useState<TaskType>({
    title: "",
    status: "",
    description: "",
    id: parseInt(nanoid()),
    subtasks: [
      {
        title: "",
        id: parseInt(nanoid()),
        isCompleted: false,
      },
      {
        title: "",
        id: parseInt(nanoid()),
        isCompleted: false,
      },
    ],
  });
  useEffect(() => {
    setActivatedColumn(
      boardState
        .find((board) => board.name === settingState.activeBoard)
        ?.columns.find((task) => task.id === settingState.activateColumn)?.name
    );
  }, [boardState, settingState.activateColumn, settingState.activeBoard]);
  const aktualizacja = () => {
    console.log(boardState[0]);

    // setActivatedColumn(
    //   boardState
    //     .find((board) => board.name === settingState.activeBoard)
    //     ?.columns.find((task) => task.id === settingState.activateColumn)?.name
    // );
    // const currentBoard = boardState.find(
    //   (item) => item.name === settingState.activeBoard
    // );
    // const activatedColumn = currentBoard?.columns.find(
    //   (item) => item.id === settingState.activateColumn
    // );
    // if (currentBoard) {
    //   setColumnsName(currentBoard.columns.map((item) => item.name));
    //   setCurrentTask(
    //     activatedColumn?.tasks.find(
    //       (item) => item.id === settingState.activateTask
    //     )
    //   );
    //   setValue("title", currentTask?.title as string);
    //   setValue("description", currentTask?.description as string);
    //   currentTask?.subtasks.map((subtask) => {
    //     setValue(`subtasks.${subtask.id}.title`, subtask.title);
    //   });
    // }
  };

  useEffect(() => {
    const currentBoard = boardState.find(
      (item) => item.name === settingState.activeBoard
    );
    const activatedColumn = currentBoard?.columns.find(
      (item) => item.id === settingState.activateColumn
    );
    if (currentBoard) {
      setColumnsName(currentBoard.columns.map((item) => item.name));
      if (!loading) {
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
        setLoading(true);
      }
    }
  }, [
    boardState,
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

  const onSubmit: SubmitHandler<BoardInputs> = (data) => {
    // setValue("status", columnsName[0]);
    // console.log(data);

    // const subtasks = newTask.subtasks.map((items) => {
    //   return {
    //     ...items,
    //     title: data.subtasks[items.id].title,
    //     isCompleted: false,
    //   };
    // });
    // const readyTask: TaskType = {
    //   title: data.title,
    //   status: data.status,
    //   description: data.description,
    //   id: currentTask?.id as number,
    //   subtasks: data.subtasks,
    // };
    // console.log(readyTask, "ready");

    setCurrentTask({
      title: data.title,
      status: data.status,
      description: data.description,
      id: currentTask?.id as number,
      subtasks: data.subtasks,
    });
    // console.log(currentTask);
    // console.log(data.status);

    const updatedBoard = boardState.map((board) => {
      if (board.name === settingState.activeBoard) {
        const activatedColumns = board.columns.map((col) => {
          // console.log(col.name, "col.name");
          // console.log(data.status, "data.status");

          if (col.name === data.status) {
            console.log(col.tasks, "task");

            const updatedTask = col.tasks.map((task) => {
              console.log(task.id, currentTask?.id);

              return task.id === currentTask?.id ? currentTask : task;
            });
            // console.log(updatedTask);

            return { ...col, tasks: updatedTask };
          }
          return col;
        });

        return { ...board, columns: activatedColumns };
      }
      return board;
    });
    console.log(updatedBoard);

    setBoardState(updatedBoard);
    // setModalsState((prev) => ({ ...prev, open: false }));
    setLoading(true);
  };
  // useEffect(() => {
  //   // setValue("status", columnsName[0]);
  // }, [columnsName, setValue]);
  const addSubTask = () => {
    console.log(currentTask?.subtasks);

    const subTaskId = parseInt(nanoid());
    setCurrentTask((task) => ({
      ...(task as TaskType),
      subtasks: [
        ...(task?.subtasks as SubtasksType[]),
        { title: "", id: subTaskId, isCompleted: false },
      ],
    }));
    console.log(currentTask?.subtasks);
  };

  useEffect(() => {
    if (loading) {
      const activatedBoard = boardState.find(
        (item) => item.name === settingState.activeBoard
      );
      if (activatedBoard) {
        setColumnsName(activatedBoard.columns.map((item) => item.name));
        setLoading(false);
      }
    }
  }, [boardState, columnsName, loading, settingState.activeBoard]);
  const deleteSubTask = (subTaskId: number) => {
    const updatedColumns = currentTask?.subtasks.filter(
      (item) => item.id !== subTaskId
    );
    setCurrentTask((prev) => ({
      ...(prev as TaskType),
      subtasks: updatedColumns as SubtasksType[],
    }));
  };

  // useEffect(() => {
  //   setNewTask({
  //     title: "",
  //     status: "",
  //     description: "",
  //     id: parseInt(nanoid()),
  //     subtasks: [
  //       {
  //         title: "",
  //         id: parseInt(nanoid()),
  //         isCompleted: false,
  //       },
  //       {
  //         title: "",
  //         id: parseInt(nanoid()),
  //         isCompleted: false,
  //       },
  //     ],
  //   }); // reset to default after close
  // reset({ title: "", status: "", description: "", subtasks: [] });
  // setErrorBoardName("");
  // console.log(modalsState);
  // setLoading(true);
  // }, [modalsState, reset]);
  // const updateStatus = (e) => {
  //   console.log(e[0]);
  //   // setActivatedColumn("aaa");
  // };
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
      focus:outline-none`}
      >
        <Dialog.Title
          className={` ${darkMode ? "text-white" : "text-black"} text-800 pb-4`}
        >
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
            {activateColumn} activateColumn {getValues("status")}
          </div>

          {subTasks}
          <ButtonSecondary
            darkMode={darkMode}
            buttonLabel="+ Add New Subtask"
            cssClasses="mb-6"
            buttonAction={addSubTask}
          />
          <p className="text-400 pb-2">Status</p>
          <button onClick={aktualizacja}> Zaktualizuj</button>
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
