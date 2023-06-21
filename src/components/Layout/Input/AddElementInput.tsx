import React, { useState } from "react";
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
  darkMode: boolean;
  column: ColumnType;
  deleteColumn: (columnId: number) => void;
  errors: FieldErrors<IFormInputs>;
  register: UseFormRegister<IFormInputs>;
};
const AddElementInput: React.FC<AddElementInputProps> = ({
  darkMode,
  column,
  deleteColumn,
  errors,
  register,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [currentValue, setCurrentValue] = useState<string>("");
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
        {...register(`columns.${column.id}.name`, {
          required: true,
          onChange: (e) => {
            setCurrentValue(e.target.value);
          },
        })}
      />
      {errors.columns?.[column.id] && (
        <span className="absolute text-red text-500 left-[50%] sm:left-[65%] top-[.6rem]">
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
export default AddElementInput;
