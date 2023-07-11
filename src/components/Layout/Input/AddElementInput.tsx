import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { ColumnType } from "../../Board/BoardType";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { RxDragHandleHorizontal } from "react-icons/rx";
interface IFormInputs {
  name: string;
  columns: ColumnType[];
}
type AddElementInputProps = {
  number: number;
  darkMode: boolean;
  column: ColumnType;
  deleteColumn: (columnId: number) => void;
  errors: FieldErrors<IFormInputs>;
  register: UseFormRegister<IFormInputs>;
  setError: (id: number) => void;
};
const AddElementInput: React.FC<AddElementInputProps> = ({
  number,
  darkMode,
  column,
  deleteColumn,
  errors,
  register,
  setError,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [currentValue, setCurrentValue] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  useEffect(() => {
    if (number % 5 === 4) {
      setPlaceholder("e.g. Done");
      return;
    }
    if (number % 5 === 3) {
      setPlaceholder("e.g. Testing");
      return;
    }
    if (number % 5 === 2) {
      setPlaceholder("e.g. Doing");
      return;
    }
    if (number % 5 === 1) {
      setPlaceholder("e.g. Todo");
      return;
    }
    setPlaceholder("e.g. Stories");
  }, [number]);
  return (
    <div
      className="flex items-center mb-3 relative"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <RxDragHandleHorizontal
        {...listeners}
        className={` text-[2rem] mr-2 ${
          darkMode ? "text-white" : "text-black"
        }`}
      />
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
        placeholder={placeholder}
        {...register(`columns.${column.id}.name`, {
          required: true,
          onChange: (e) => {
            setCurrentValue(e.target.value);
            setError(column.id);
          },
        })}
      />
      {errors.columns?.[column.id]?.name && (
        <span className="absolute text-red text-500 left-[50%] sm:left-[65%] top-[.6rem]">
          Can`t be empty
        </span>
      )}
      {errors.columns?.[column.id]?.type && (
        <span className="absolute text-red text-500 left-[35%] sm:left-[55%] top-[.6rem]">
          Name must be unique
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
export default AddElementInput;
