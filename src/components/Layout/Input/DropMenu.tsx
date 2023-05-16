"use client";
import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";
type DropMenuProps = { darkMode: boolean };

type StanType = "Todo" | "Doing" | "Done";

const DropMenu: React.FC<DropMenuProps> = ({ darkMode }) => {
  const [stan, setStan] = useState<StanType>("Todo");
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div
          className={`flex items-center cursor-pointer  px-4 py-2 
        rounded-[4px] border-[1px] border-[rgba(130,_143,_163,_0.25)] hover:border-purple 
        justify-between ${darkMode ? "text-white" : "text-black"}`}>
          <p>{stan}</p>
          <MdKeyboardArrowDown className="text-purple text-800" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={` mt-2 flex text-mediumGrey z-[300]
        flex-col w-[350px] p-4 space-y-2 rounded-lg ${
          darkMode ? "bg-veryDarkGrey " : "bg-white "
        } `}>
          <DropdownMenu.Item
            className="hover:outline-none cursor-pointer hover:opacity-70"
            onClick={() => {
              setStan("Todo");
            }}>
            Todo
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="hover:outline-none cursor-pointer hover:opacity-70"
            onClick={() => {
              setStan("Doing");
            }}>
            Doing
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="hover:outline-none cursor-pointer hover:opacity-70"
            onClick={() => {
              setStan("Done");
            }}>
            Done
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
export default DropMenu;
