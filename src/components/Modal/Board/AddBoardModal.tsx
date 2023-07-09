import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "@/src/atoms/settingsModalAtom";
import { auth, firestore } from "@/src/firebase/clientApp";
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
import * as Dialog from "@radix-ui/react-dialog";
import { doc, updateDoc } from "firebase/firestore";
import { customAlphabet } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { boardsState } from "../../../atoms/boardsAtom";
import { BoardType, ColumnType } from "../../Board/BoardType";
import AddElementInput from "../../Layout/Input/AddElementInput";
import ButtonPrimarySmall from "../../Layout/Button/ButtonPrimarySmall";
import ButtonSecondary from "../../Layout/Button/ButtonSecondary";
const nanoid = customAlphabet("1234567890", 15);
type AddBoardModalProps = {
  darkMode: boolean;
};
interface BoardInputs {
  name: string;
  columns: ColumnType[];
}
const AddBoardModal: React.FC<AddBoardModalProps> = ({ darkMode }) => {
  const [user] = useAuthState(auth);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [errorBoardName, setErrorBoardName] = useState<string>("");
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const [columnsListId, setColumnsListId] = useState<number[]>([]);
  const [isNameisUnique, setIsNameisUnique] = useState<boolean>(false);
  const isUniqueRef = useRef<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BoardInputs>();
  const [newBoard, setNewBoard] = useState<BoardType>({
    name: "",
    id: parseInt(nanoid()),
    columns: [],
  });
  const onSubmit: SubmitHandler<BoardInputs> = async (data) => {
    isUniqueRef.current = true;
    if (
      boardState.find(
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
    columns.forEach((item) => {
      if (columns.filter((cols) => item.name === cols.name).length > 1) {
        setError(`columns.${item.id}`, {
          type: "uniqueName",
        });
        isUniqueRef.current = false;
      }
    });
    if (!isUniqueRef.current) return;
    const updatedBoard: BoardType = {
      name: data.name,
      id: newBoard.id,
      columns: columns,
    };
    setBoardState((prev) => [...prev, updatedBoard]);
    setModalsState((prev) => ({ ...prev, open: false }));
    setSettingState((prev) => ({ ...prev, activeBoard: data.name }));
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        board: [...boardState, updatedBoard],
        activeBoard: data.name,
      });
    }
  };
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
    reset({ columns: [] });
  };
  useEffect(() => {
    setNewBoard({ name: "", id: parseInt(nanoid()), columns: [] }); // reset to default after close
    reset({ name: "", columns: [] });
    setErrorBoardName("");
  }, [modalsState, reset]);

  const clearInputErrors = () => {
    clearErrors("columns");
  };

  const columns = newBoard.columns.map((item, number) => (
    <AddElementInput
      key={item.id}
      number={number}
      darkMode={darkMode}
      column={item}
      deleteColumn={deleteColumn}
      errors={errors}
      register={register}
      setError={clearInputErrors}
    />
  ));

  useEffect(() => {
    setColumnsListId(newBoard?.columns?.map((col) => col.id));
  }, [newBoard]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const handleDragDrop = async (e: DragEndEvent) => {
    if (e.active.id === e.over?.id) return;
    setNewBoard((prev) => {
      let columns = prev.columns;
      const activatedColumn = columns.findIndex(
        (cols) => cols.id === e.active.id
      );
      const targetColumn = columns.findIndex((cols) => cols.id === e.over?.id);
      const updatedColumns = arrayMove(columns, activatedColumn, targetColumn);
      return { ...prev, columns: updatedColumns };
    });
  };
  return (
    <>
      <Dialog.Title
        className={` ${darkMode ? "text-white" : "text-black"} text-800 pb-4`}
      >
        Add New Board
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-baseline justify-between "></div>
        <h3
          className={`text-400 pb-2 ${darkMode ? "text-white" : "text-black"}`}
        ></h3>
        <div className="relative">
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
              onChange() {
                setErrorBoardName("");
              },
            })}
          />
          {errors.name && (
            <span className="absolute text-red text-500 left-[60%] sm:left-[70%] top-[.6rem]">
              Can`t be empty
            </span>
          )}
          {errorBoardName && (
            <span className="absolute text-red text-500 left-[55%] sm:left-[65%] top-[.6rem]">
              {errorBoardName}
            </span>
          )}
        </div>
        <h3
          className={`text-400 pb-2 mt-6 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Boards Columns
        </h3>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragDrop}
          sensors={sensors}
        >
          <SortableContext
            items={columnsListId}
            strategy={verticalListSortingStrategy}
          >
            <div className="overflow-auto scrollbar overflow-x-clip pr-1 max-h-[200px] mb-4">
              {columns}
            </div>
          </SortableContext>
        </DndContext>
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
    </>
  );
};
export default AddBoardModal;
