"use client";
import React, { forwardRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Select from "@radix-ui/react-select";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ControllerRenderProps, Noop, RefCallBack } from "react-hook-form";
import { SubtasksType } from "../../Board/BoardType";

interface BoardInputs {
  title: string;
  description: string;
  subtasks: SubtasksType[];
  status: string;
}
type DropMenuProps = {
  darkMode: boolean;
  // columnsNames: string[];
  // activatedElement: () => void;
  // onBlur: Noop;
  onChange: () => void;
  // checked: string;
  // inputRef: RefCallBack;
  children: React.JSX.Element[];
  value: string;
};

// eslint-disable-next-line react/display-name
const DropMenu = forwardRef<HTMLButtonElement, DropMenuProps>(
  ({ children, value, onChange, darkMode }, ref) => {
    return (
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger ref={ref} aria-label="Task Column" className="text-500">
          <div
            className={`flex items-center cursor-pointer px-4 py-2
        rounded-[4px] border-[1px] border-[rgba(130,_143,_163,_0.25)] hover:border-purple
        justify-between ${darkMode ? "text-white" : "text-black"}`}
          >
            <Select.Value placeholder={value} aria-label={value}>
              {value}
            </Select.Value>
            <MdKeyboardArrowDown className="text-purple text-800" />
          </div>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            className={`mt-2 flex text-mediumGrey z-[300]
      flex-col w-full p-4 space-y-2 rounded-lg ${
        darkMode ? "bg-veryDarkGrey " : "bg-white "
      } `}
          >
            <Select.Group>{children}</Select.Group>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

export default DropMenu;
