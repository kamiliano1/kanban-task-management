import React from "react";
import * as Form from "@radix-ui/react-form";
import { AiOutlineClose } from "react-icons/ai";
type AddElementInputProps = {
  darkMode: boolean;
};

const AddElementInput: React.FC<AddElementInputProps> = ({ darkMode }) => {
  return (
    <Form.Root className=" text-500">
      <Form.Field className="grid relative" name="name">
        <div className="flex items-baseline justify-between relative ">
          <Form.Message
            className="text-red text-500 pr-2 absolute top-[40px] left-[70%]"
            match="valueMissing"
          >
            Can`t be empty
          </Form.Message>
        </div>
        <Form.Control asChild>
          <div className="flex items-center mb-3">
            <input
              className={`text-500 placeholder:text-black w-full
            FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px] 
             border-[rgba(130,_143,_163,_0.25)] ${
               darkMode
                 ? "text-white bg-[#2B2C37] placeholder:text-white"
                 : "text-black placeholder:text-black"
             }`}
              type="text"
              required
              placeholder={"placeholder"}
            />
            <AiOutlineClose className="text-[.95rem] ml-4 text-mediumGrey cursor-pointer hover:text-lightGrey" />
          </div>
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
};
export default AddElementInput;
