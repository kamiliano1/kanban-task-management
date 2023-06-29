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
import { auth, firestore } from "@/src/firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
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
type EditBoardModalProps = { darkMode: boolean };
interface BoardInputs {
  name: string;
  columns: ColumnType[];
}

const EditBoardModal: React.FC<EditBoardModalProps> = ({ darkMode }) => {
  const [user] = useAuthState(auth);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [errorBoardName, setErrorBoardName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [columnsListId, setColumnsListId] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    watch,

    reset,

    setValue,
    formState: { errors },
  } = useForm<BoardInputs>();

  const [newBoard, setNewBoard] = useState<BoardType>({
    name: "",
    id: parseInt(nanoid()),
    columns: [],
  });
  const onSubmit: SubmitHandler<BoardInputs> = async (data) => {
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
      prev.map((item) => (item.id === readyBoard.id ? readyBoard : item))
    );

    setModalsState((prev) => ({ ...prev, open: false }));
    setSettingState((prev) => ({ ...prev, activeBoard: data.name }));
    if (user) {
      const updatedBoard = boardState.map((board) =>
        board.id === newBoard.id ? readyBoard : board
      );
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        board: updatedBoard,
      });
    }
  };

  useEffect(() => {
    if (loading) {
      setNewBoard(
        boardState.filter((item) => item.name === settingState.activeBoard)[0]
      );

      setLoading(false);
    }
  }, [boardState, loading, settingState.activeBoard]);

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
    setColumnsListId(newBoard?.columns?.map((col) => col.id));
  }, [newBoard]);
  useEffect(() => {
    if (modalsState.open) {
      setValue("name", newBoard.name);
      newBoard.columns.map((item) => {
        if (item.name) setValue(`columns.${item.id}.name`, item.name);
      });
    }
  }, [newBoard, newBoard.columns, newBoard.name, setValue, modalsState]);
  useEffect(() => {
    setErrorBoardName("");
    if (!modalsState.open) {
      reset({ name: newBoard.name, columns: [] });
    }
  }, [modalsState, newBoard?.columns, newBoard.name, reset, watch]);
  useEffect(() => {
    setLoading(true);
  }, [modalsState]);
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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  return (
    <>
      <Dialog.Title
        className={` ${darkMode ? "text-white" : "text-black"} text-800 pb-4`}
      >
        Edit Board
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3
          className={`text-400 pb-2 ${darkMode ? "text-white" : "text-black"}`}
        >
          Board Name
        </h3>
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
          buttonLabel="Save Changes"
          buttonAction={() => handleSubmit(onSubmit)}
        />
      </form>
    </>
  );
};
export default EditBoardModal;
