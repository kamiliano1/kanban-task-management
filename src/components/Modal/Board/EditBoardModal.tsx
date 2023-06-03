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
import { BoardType, ColumnType } from "../../Board/BoardType";
const nanoid = customAlphabet("1234567890", 15);
type EditBoardModalProps = { darkMode: boolean };
interface BoardInputs {
  name: string;
  columns: ColumnType[];
}

const EditBoardModal: React.FC<EditBoardModalProps> = ({ darkMode }) => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [errorBoardName, setErrorBoardName] = useState<string>("");
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<BoardInputs>();

  const [newBoard, setNewBoard] = useState<BoardType>({
    name: "",
    id: parseInt(nanoid()),
    columns: [],
  });
  const onSubmit: SubmitHandler<BoardInputs> = (data) => {
    const otherBoards = boardState.filter((item) => item.name != newBoard.name);
    if (
      otherBoards.find(
        (item) =>
          item.name.toLocaleLowerCase() === watch("name").toLocaleLowerCase()
      )
    ) {
      setErrorBoardName("Name already exist");
      return;
    }
    const columns = newBoard.columns.map((items) => {
      return { ...items, name: data.columns[items.id].name };
    });
    const readyBoard: BoardType = {
      name: data.name,
      id: newBoard.id,
      columns: columns,
    };

    setBoardState((prev) =>
      prev.map((item) => (item.id === newBoard.id ? readyBoard : item))
    );
    setModalsState((prev) => ({ ...prev, open: false }));
    setSettingState((prev) => ({ ...prev, activeBoard: data.name }));
  };

  useEffect(() => {
    setNewBoard(
      boardState.filter((item) => item.name === settingState.activeBoard)[0]
    );
  }, [boardState, settingState.activeBoard]);
  const addColumn = () => {
    const columnId = parseInt(nanoid());
    setNewBoard((prev) => ({
      ...prev,
      columns: [...prev.columns, { name: "", id: columnId, tasks: [] }],
    }));
  };
  const deleteColumn = (columnId: number) => {
    const updatedColumns = newBoard.columns.filter(
      (item) => item.id !== columnId
    );
    setNewBoard((prev) => ({ ...prev, columns: updatedColumns }));
  };

  useEffect(() => {
    setValue("name", newBoard.name);
    newBoard.columns.map((item) => {
      setValue(`columns.${item.id}.name`, item.name);
    });
  }, [newBoard.columns, newBoard.name, setValue]);
  useEffect(() => {
    setErrorBoardName("");
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
  focus:outline-none`}>
        <Dialog.Title
          className={` ${
            darkMode ? "text-white" : "text-black"
          } text-800 pb-4`}>
          Edit Board
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
           errors.name || errorBoardName
             ? "border-red"
             : "border-[rgba(130,_143,_163,_0.25)]"
         }
          w-full ${
            darkMode
              ? "text-white bg-[#2B2C37] placeholder:text-white"
              : "text-black placeholder:text-black"
          }`}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <span className="absolute text-red text-500 left-[70%] top-[.6rem]">
                Can`t be empty
              </span>
            )}
            {errorBoardName && (
              <span className="absolute text-red text-500 left-[65%] top-[.6rem]">
                {errorBoardName}
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
            buttonLabel="Save Changes"
            buttonAction={() => handleSubmit(onSubmit)}
          />
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default EditBoardModal;
