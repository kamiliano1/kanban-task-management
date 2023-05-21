import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { AiOutlineClose } from "react-icons/ai";
import { ColumnType } from "../../Board/BoardType";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
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
  const [currentValue, setCurrentValue] = useState<string>("");
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
        {...register(`columns.${column.id}.name`, {
          onChange: (e) => {
            setCurrentValue(e.target.value);
          },
        })}
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
export default AddElementInput;
