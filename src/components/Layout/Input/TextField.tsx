"use client";
import React from "react";
import * as Form from "@radix-ui/react-form";
type TextFieldProps = { darkMode: boolean; title: string; placeholder: string };

const TextField: React.FC<TextFieldProps> = ({
  darkMode,
  title,
  placeholder,
}) => {
  return (
    <Form.Root className="text-500">
      <Form.Field className="grid relative" name="name">
        <div className="flex items-baseline justify-between relative ">
          <Form.Label className={`pb-2 ${!darkMode && "text-mediumGrey"}`}>
            {title}
          </Form.Label>
          <Form.Message
            className="text-red text-500 pr-2 absolute top-[40px] left-[70%]"
            match="valueMissing"
          >
            Can`t be empty
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className={`text-500 placeholder:text-black
            FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px] mb-6 
             border-[rgba(130,_143,_163,_0.25)] ${
               darkMode
                 ? "text-white bg-[#2B2C37] placeholder:text-white"
                 : "text-black placeholder:text-black"
             }`}
            type="text"
            required
            placeholder={placeholder}
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
};
export default TextField;
