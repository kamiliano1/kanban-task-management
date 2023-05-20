import React, { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TextField from "../Layout/Input/TextField";
import Checkbox from "../Layout/Input/Checkbox";
import DropMenu from "../Layout/Input/DropMenu";
import TextArea from "../Layout/Input/TextArea";
import { AiOutlineClose } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import ButtonSecondary from "../Layout/Input/Button/ButtonSecondary";
import ButtonPrimarySmall from "../Layout/Input/Button/ButtonPrimarySmall";
import AddElementInput from "../Layout/Input/AddElementInput";
// import { BoardType } from "../Board/BoardType";
import { customAlphabet } from "nanoid";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { BoardType, ColumnType, TaskType } from "../Board/BoardType";
import { useRecoilState, useRecoilValue } from "recoil";
import { BoardsAtom, boardsState } from "../../atoms/boardsAtom";
import { modalState } from "@/src/atoms/modalAtom";

const nanoid = customAlphabet("1234567890", 2);
type AddBoardModalProps = {
  darkMode: boolean;
};

interface IFormInputs {
  name: string;
  columns: ColumnType[];
}
const AddBoardModal: React.FC<AddBoardModalProps> = ({ darkMode }) => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [errorBoardName, setErrorBoardName] = useState<string>("");
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    setError,
    formState: { errors },
  } = useForm<IFormInputs>();
  const [newBoard, setNewBoard] = useState<BoardType>({
    name: "",
    id: parseInt(nanoid()),
    columns: [],
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const columns = newBoard.columns.map((items) => {
      return { ...items, name: data.columns[items.id].name };
    });
    setNewBoard((prev) => ({
      ...prev,
      name: data.name,
      columns: columns,
    }));
    setBoardState((prev) => [...prev, newBoard]);
  };
  const addColumn = () => {
    const columnId = parseInt(nanoid());
    setNewBoard((prev) => ({
      ...prev,
      columns: [...prev.columns, { name: "", id: columnId, tasks: [] }],
    }));
    console.log(
      boardState.find((item) => {
        console.log(item.name, watch("name"));

        return (
          item.name.toLocaleLowerCase() === watch("name").toLocaleLowerCase()
        );
      }),
      "konsola"
    );
  };
  const deleteColumn = (columnId: number) => {
    const updatedColumns = newBoard.columns.filter(
      (item) => item.id !== columnId
    );
    setNewBoard((prev) => ({ ...prev, columns: updatedColumns }));
  };
  useEffect(() => {
    setNewBoard({ name: "", id: parseInt(nanoid()), columns: [] }); // reset to default after close
    reset({ name: "", columns: [] });
  }, [modalsState, reset]);

  const columns = newBoard.columns.map((item) => (
    <AddElementInput
      key={item.id}
      darkMode={darkMode}
      column={item}
      deleteColumn={deleteColumn}
      errors={errors}
      register={register}
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
          Add New Board
        </Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-baseline justify-between "></div>
          <h3 className="text-400 pb-2">Board Name</h3>
          <div className="relative ">
            <input
              placeholder="e.g. Web Design"
              className={`text-500 placeholder:text-black
            FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px]
             ${
               errors.name ? "border-red" : "border-[rgba(130,_143,_163,_0.25)]"
             }
              w-full ${
                darkMode
                  ? "text-white bg-[#2B2C37] placeholder:text-white"
                  : "text-black placeholder:text-black"
              }`}
              {...register("name", { required: true })}
            />

            {errors.name && (
              <span className="absolute text-red text-500 left-[70%] top-[.6rem]">
                Can`t be empty
              </span>
            )}
          </div>

          <h3 className="text-400 pb-2 mt-6">Boards Columns</h3>
          {columns}

          <ButtonSecondary
            darkMode={darkMode}
            buttonLabel="+ Add New Column"
            cssClasses="mb-6"
            buttonAction={addColumn}
          />

          <ButtonPrimarySmall
            buttonLabel="Create New Board"
            buttonAction={() => handleSubmit(onSubmit)}
          />
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default AddBoardModal;
