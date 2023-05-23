"use client";
import React, { forwardRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Select from "@radix-ui/react-select";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ControllerRenderProps } from "react-hook-form";
import { SubtasksType } from "../../Board/BoardType";

interface BoardInputs {
  title: string;
  description: string;
  subtasks: SubtasksType[];
  status: string;
}
type DropMenuProps = {
  darkMode: boolean;
  columnsNames: string[];
  activatedElement: () => void;
  // onChange: () => void;
  // selected: string;
  field: ControllerRenderProps<BoardInputs, "status">;
};

const DropMenu: React.FC<DropMenuProps> = ({
  darkMode,
  columnsNames,
  activatedElement,
  // selected,
  field,
}) => {
  console.log(field, "field");
  const [activeElement, setActiveElement] = useState(columnsNames[0]);
  const dropMenuElements = columnsNames.map((item) => (
    <Select.Item
      onClick={() => {
        setActiveElement(item);
      }}
      key={item}
      className="hover:outline-none cursor-pointer hover:opacity-70"
      value={item}>
      {item}
    </Select.Item>
  ));

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild {...field}>
        <div
          className={`flex items-center cursor-pointer px-4 py-2 
        rounded-[4px] border-[1px] border-[rgba(130,_143,_163,_0.25)] hover:border-purple 
        justify-between ${darkMode ? "text-white" : "text-black"}`}>
          <p>{activeElement}</p>
          <MdKeyboardArrowDown className="text-purple text-800" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={` mt-2 flex text-mediumGrey z-[300]
        flex-col w-[350px] p-4 space-y-2 rounded-lg ${
          darkMode ? "bg-veryDarkGrey " : "bg-white "
        } `}>
          {dropMenuElements}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropMenu;
