"use client";
import React from "react";
import * as CheckBox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
type CheckboxProps = {
  darkMode: boolean;
  checkboxLabel: string;
  subTaskId: number;
  isCompleted: boolean;
  toggleSubtask: (subTaskId: number) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  darkMode,
  checkboxLabel,
  subTaskId,
  isCompleted,
  toggleSubtask,
}) => {
  return (
    <div
      onClick={() => {
        toggleSubtask(subTaskId);
      }}
      className={`flex items-center justify-start bg-veryDarkGrey cursor-pointer
       hover:bg-[rgba(99,_95,_199,_.25)] text-400 py-3 px-3 mb-2 ${
         darkMode ? "bg-veryDarkGrey text-white" : "bg-white text-black"
       }`}
    >
      <CheckBox.Root
        className={`h-4 aspect-square border-[1px] border-[rgba(130,_143,_163,_0.24)] rounded-sm bg-white `}
        checked={isCompleted}
        id={checkboxLabel}
      >
        <CheckBox.Indicator>
          <CheckIcon className="text-white bg-purple h-4" />
        </CheckBox.Indicator>
      </CheckBox.Root>
      <label
        className={`text-bold px-4 cursor-pointer ${
          isCompleted && "line-through opacity-50"
        }`}
        htmlFor={checkboxLabel}
      >
        {checkboxLabel}
      </label>
    </div>
  );
};
export default Checkbox;
