"use client";
import * as Select from "@radix-ui/react-select";
import React, { forwardRef, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

type DropMenuProps = {
  darkMode: boolean;
  onChange: () => void;
  value: string;
  columnsName: string[];
};

// eslint-disable-next-line react/display-name
const DropMenu = forwardRef<HTMLButtonElement, DropMenuProps>(
  ({ value, onChange, darkMode, columnsName }, ref) => {
    const selectElements = columnsName.map((item) => (
      <Select.Item
        value={item}
        key={item}
        className={`text-500 w-[330px]
      rounded-[8px] py-2
      select-none data-[disabled]:pointer-events-none
      data-[highlighted]:outline-none cursor-pointer ${
        darkMode
          ? "data-[highlighted]:text-white"
          : "data-[highlighted]:text-darkGrey"
      }`}
      >
        <Select.ItemText>{item}</Select.ItemText>
      </Select.Item>
    ));

    return (
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger ref={ref} aria-label="Task Column" className="text-500">
          <div
            className={`flex items-center cursor-pointer px-4 py-2
        rounded-[4px] border-[1px] border-[rgba(130,_143,_163,_0.25)] hover:border-purple
        justify-between ${darkMode ? "text-white" : "text-black"}`}
          >
            <Select.Value
              className="w-[200px]"
              aria-label={value}
              onChange={onChange}
            >
              {value ? value : columnsName[0]}
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
            <Select.Group>{selectElements}</Select.Group>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

export default DropMenu;
