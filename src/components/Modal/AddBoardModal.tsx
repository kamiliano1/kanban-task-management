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
// import { BoardType, ColumnType } from "@/src/atoms/boardsAtom";
type AddBoardModalProps = {
  darkMode: boolean;
};

// `columns.${string}.name`

interface IFormInputs {
  name: string;
  columns: ColumnType[];
}
// eslint-disable-next-line react-hooks/rules-of-hooks
const AddBoardModal: React.FC<AddBoardModalProps> = ({ darkMode }) => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();
  const [newBoard, setNewBoard] = useState<BoardType>({
    name: "",
    id: parseInt(nanoid()),
    columns: [],
  });
  const myValue = watch("columns");
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const columns = newBoard.columns.map((items, id) => {
      // console.log(data);
      return { ...items, name: data.columns[items.id].name };
    });
    // console.log(columns), "data";

    setNewBoard((prev) => ({
      ...prev,
      name: data.name,
      columns: columns,
    }));
    setBoardState((prev) => [...prev, newBoard]);
    // console.log(boardState, "nowa");
  };

  const addColumn = () => {
    const columnId = parseInt(nanoid());
    console.log(myValue, "cols");
    // console.log(myValue[0]);

    setNewBoard((prev) => ({
      ...prev,
      columns: [...prev.columns, { name: "", id: columnId, tasks: [] }],
    }));
    // setFocus(`columns.${columnId}`);

    // console.log(newBoard);
  };

  // type ColumnType = {
  //   name: string;
  //   id: number;
  //   tasks: TaskType[];
  // };
  type AddElementInputProps = {
    darkMode: boolean;
    column: ColumnType;
  };
  useEffect(() => {
    setNewBoard({ name: "", id: parseInt(nanoid()), columns: [] }); // reset to default after close
    reset({ name: "", columns: [] });
  }, [modalsState, reset]);
  const AddInput: React.FC<AddElementInputProps> = ({ darkMode, column }) => {
    const deleteColumn = (columnId: number) => {
      // console.log(errors);
      // console.log(errors.columns);
      // console.log(errors.columns?.[columnId]);

      const updatedColumns = newBoard.columns.filter(
        (item) => item.id !== columnId
      );
      setNewBoard((prev) => ({ ...prev, columns: updatedColumns }));
    };
    return (
      <div className="flex items-center mb-3 relative">
        <input
          className={`text-500 placeholder:text-black w-full
    FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px]
     border-[rgba(130,_143,_163,_0.25)]
     ${
       errors.columns?.[column.id]
         ? "border-red"
         : "border-[rgba(130,_143,_163,_0.25)]"
     }
     ${
       darkMode
         ? "text-white bg-[#2B2C37] placeholder:text-white"
         : "text-black placeholder:text-black"
     }`}
          {...register(`columns.${column.id}.name`, { required: true })}
        />
        {errors.columns?.[column.id] && (
          <span className="absolute text-red text-500 left-[65%] top-[.6rem]">
            Can`t be empty
          </span>
        )}
        <ImCross
          onClick={() => {
            deleteColumn(column.id);
          }}
          className={`text-[1rem] font-bold ml-4  ${
            errors.columns?.[column.id] ? "text-red" : "text-mediumGrey"
          } cursor-pointer
           hover:text-lightGrey`}
        />
      </div>
    );
  };

  const columns = newBoard.columns.map((item, id) => (
    <AddInput key={item.id} darkMode={darkMode} column={item} />
  ));

  {
    `
  className="text-red text-500 pr-2 absolute top-[40px] left-[70%]"
  match="valueMissing"`;
  }

  // className={`pb-2 ${!darkMode && "text-mediumGrey"}`}
  // {"title"}
  // Can`t be empty

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
          {/* {errors.namee && <span>Namee</span>} */}
          {/* <button type="submit">SUBMIT </button> */}

          <h3 className="text-400 pb-2 mt-6">Boards Columns</h3>
          {columns}
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
              {...register(`columns.${1}.name`, { required: true })}
            />

            {errors.columns?.[1] && (
              <span className="absolute text-red text-500 left-[70%] top-[.6rem]">
                Can`t be empty
              </span>
            )}
          </div>
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
              {...register(`columns.${2}.name`, { required: true })}
            />

            {errors.columns?.[2] && (
              <span className="absolute text-red text-500 left-[70%] top-[.6rem]">
                Can`t be empty
              </span>
            )}
          </div>

          <ButtonSecondary
            darkMode={darkMode}
            buttonLabel="+ Add New Column"
            cssClasses="mb-6"
            buttonAction={addColumn}
          />

          {/* <Dialog.Close asChild> */}
          <ButtonPrimarySmall
            buttonLabel="Create New Board"
            buttonAction={() => handleSubmit(onSubmit)}
          />
          {/* </Dialog.Close> */}
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default AddBoardModal;
