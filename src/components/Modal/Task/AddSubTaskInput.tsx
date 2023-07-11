import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { RxDragHandleHorizontal } from "react-icons/rx";
import { SubtasksType } from "../../Board/BoardType";
interface TaskFormInputs {
  title: string;
  description: string;
  subtasks: SubtasksType[];
  status: string;
}
type AddSubTaskInputProps = {
  darkMode: boolean;
  subtasks: SubtasksType;
  deleteSubTask: (columnId: number) => void;
  errors: FieldErrors<TaskFormInputs>;
  register: UseFormRegister<TaskFormInputs>;
  number: number;
};
const AddSubTaskInput: React.FC<AddSubTaskInputProps> = ({
  darkMode,
  subtasks,
  deleteSubTask,
  errors,
  register,
  number,
}) => {
  const [placeholder, setPlaceholder] = useState<string>("");
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: subtasks.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  useEffect(() => {
    setPlaceholder(
      number % 2 === 0 ? "e.g. Make coffee" : "e.g. Drink coffee & smile"
    );
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
           errors.subtasks?.[subtasks.id]
             ? "border-red"
             : "border-[rgba(130,_143,_163,_0.25)]"
         }
         ${
           darkMode
             ? "text-white bg-[#2B2C37] placeholder:text-white"
             : "text-black placeholder:text-black"
         }`}
        {...register(`subtasks.${subtasks.id}.title`, {
          required: true,
        })}
        placeholder={placeholder}
      />
      {errors.subtasks?.[subtasks.id] && (
        <span className="absolute text-red text-500 left-[50%] sm:left-[65%] top-[.6rem]">
          Can`t be empty
        </span>
      )}
      <ImCross
        onClick={() => {
          deleteSubTask(subtasks.id);
        }}
        className={`text-[1rem] font-bold ml-4  ${
          errors.subtasks?.[subtasks.id] ? "text-red" : "text-mediumGrey"
        } cursor-pointer ${
          darkMode ? "hover:text-lightGrey" : "hover:text-darkGrey"
        } `}
      />
    </div>
  );
};
export default AddSubTaskInput;
