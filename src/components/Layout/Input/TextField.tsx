"use client";
import React from "react";
import * as Form from "@radix-ui/react-form";
type TextFieldProps = {};

const TextField: React.FC<TextFieldProps> = () => {
  return (
    <Form.Root className="w-[295px] text-500">
      <Form.Field className="grid relative " name="name">
        <div className="flex items-baseline justify-between relative">
          <Form.Label className=" pb-2">Tytuł</Form.Label>
          <Form.Message
            className="text-red text-500 pr-2 absolute top-[40px] left-[57%]"
            match="valueMissing"
          >
            Can`t be empty
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className=" text-500 text-black placeholder:text-black FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px] border-[rgba(130,_143,_163,_0.25)]"
            type="text"
            required
            placeholder="Enter task name"
          />
        </Form.Control>
      </Form.Field>
    </Form.Root>
  );
};
export default TextField;
