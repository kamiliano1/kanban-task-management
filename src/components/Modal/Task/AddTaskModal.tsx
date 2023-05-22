import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useRef, useState } from "react";
import AddElementInput from "../../Layout/Input/AddElementInput";
import ButtonPrimarySmall from "../../Layout/Input/Button/ButtonPrimarySmall";
import ButtonSecondary from "../../Layout/Input/Button/ButtonSecondary";
import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "@/src/atoms/settingsModalAtom";
import { customAlphabet } from "nanoid";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { boardsState } from "../../../atoms/boardsAtom";
import { BoardType } from "../../Board/BoardType";
import { SubtasksType, TaskType } from "../../Board/BoardType";
import AddSubTaskInput from "./AddSubTaskInput";
import DropMenu from "../../Layout/Input/DropMenu";
const nanoid = customAlphabet("1234567890", 2);
type AddTaskModalProps = { darkMode: boolean };
interface BoardInputs {
  title: string;
  description: string;
  subtasks: SubtasksType[];
  status: string;
}
// "title": "Plan Product Hunt launch",
// "description": "",
// "status": "Todo",
// "subtasks": [
const AddTaskModal: React.FC<AddTaskModalProps> = ({ darkMode }) => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [errorBoardName, setErrorBoardName] = useState<string>("");
  const [columnsName, setColumnsName] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    setError,
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
  const onSubmit: SubmitHandler<BoardInputs> = (data) => {
    // if (
    //   boardState.find(
    //     (item) =>
    //       item.name.toLocaleLowerCase() === watch("name").toLocaleLowerCase()
    //   )
    // ) {
    //   setErrorBoardName("Name already exist");
    //   return;
    // }
    // const columns = newBoard.columns.map((items) => {
    //   return { ...items, name: data.columns[items.id].name };
    // });
    // const readyBoard: BoardType = {
    //   name: data.name,
    //   id: newBoard.id,
    //   columns: columns,
    // };
    // setBoardState((prev) => [...prev, readyBoard]);
    // setModalsState((prev) => ({ ...prev, open: false }));
    // setSettingState((prev) => ({ ...prev, activeBoard: data.name }));
  };
  const addSubTask = () => {
    const subTaskId = parseInt(nanoid());
    setNewTask((prev) => ({
      ...prev,
      subtasks: [
        ...prev.subtasks,
        { title: "", id: subTaskId, isCompleted: false },
      ],
    }));
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
    const updatedColumns = newTask.subtasks.filter(
      (item) => item.id !== subTaskId
    );
    setNewTask((prev) => ({ ...prev, subtasks: updatedColumns }));
  };
  useEffect(() => {
    // setNewBoard({ name: "", id: parseInt(nanoid()), columns: [] }); // reset to default after close
    // reset({ name: "", columns: [] });
    // setErrorBoardName("");
  }, [modalsState, reset]);
  const testuj = () => {
    console.log(
      boardState.find((item) => item.name === settingState.activeBoard)
    );
  };
  const subTasks = newTask.subtasks.map((item, number) => (
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
          Add New Task
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
            {/* {errorBoardName && (
              <span className="absolute text-red text-500 left-[65%] top-[.6rem]">
                {errorBoardName}
              </span>
            )} */}
            <p className="text-400 pb-2">Description</p>
            <button type="button" onClick={testuj}>
              Sprawdzaj
            </button>
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
                required: true,
              })}
            />
            <p className="text-400 pb-2">Subtasks</p>
          </div>

          {subTasks}
          <ButtonSecondary
            darkMode={darkMode}
            buttonLabel="+ Add New Subtask"
            cssClasses="mb-6"
            buttonAction={addSubTask}
          />
          <p className="text-400 pb-2">Status</p>
          <DropMenu darkMode={darkMode} columnsNames={columnsName} />
          <ButtonPrimarySmall
            buttonLabel="Create Task"
            buttonAction={() => handleSubmit(onSubmit)}
          />
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default AddTaskModal;
