"use client";
import React from "react";
import * as Form from "@radix-ui/react-form";
type TextAreaProps = { darkMode: boolean };

const TextArea: React.FC<TextAreaProps> = ({ darkMode }) => {
  return (
    <Form.Root className="w-[295px] text-500">
      <Form.Field className="grid relative " name="name">
        <div className="flex items-baseline justify-between  relative">
          <Form.Label className={`pb-2 ${!darkMode && "text-mediumGrey"}`}>
            Description
          </Form.Label>
          <Form.Message
            className="text-red text-500 pr-2 absolute top-[40px] left-[57%]"
            match="valueMissing"
          >
            Can`t be empty
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className={`text-500 placeholder:text-black h-[112px]
                        FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px] 
                         border-[rgba(130,_143,_163,_0.25)] ${
                           darkMode
                             ? "text-white bg-[#2B2C37] placeholder:text-white"
                             : "text-black placeholder:text-black"
                         }`}
            required
            placeholder="e.g. It`s always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
};
export default TextArea;
