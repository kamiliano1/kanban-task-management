"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as CheckBox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { RxDragHandleHorizontal } from "react-icons/rx";
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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: subTaskId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className="flex justify-center items-center  mb-2"
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
      <div
        onClick={() => {
          toggleSubtask(subTaskId);
        }}
        className={`flex items-center justify-start bg-veryDarkGrey cursor-pointer
       hover:bg-[rgba(99,_95,_199,_.25)] text-400 py-3 px-3  w-full ${
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
    </div>
  );
};
export default Checkbox;
