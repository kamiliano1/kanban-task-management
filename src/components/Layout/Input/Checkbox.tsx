"use client";
import React, { useState } from "react";

import * as CheckBox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

type CheckboxProps = { darkMode: boolean };

const Checkbox: React.FC<CheckboxProps> = ({ darkMode }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <form>
      <div
        className={`flex items-center justify-start bg-veryDarkGrey 
       hover:bg-[rgba(99,_95,_199,_.25)] text-400 py-3 px-3 ${
         darkMode ? "bg-veryDarkGrey text-white" : "bg-white text-black"
       }`}
      >
        <CheckBox.Root
          className={`h-4 aspect-square border-[1px] border-[rgba(130,_143,_163,_0.24)] rounded-sm ${
            darkMode ? "bg-darkGrey " : ""
          } `}
          checked={isClicked}
          onClick={() => setIsClicked((prev) => !prev)}
          id="c1"
        >
          <CheckBox.Indicator className="">
            <CheckIcon className="text-white bg-purple h-4" />
          </CheckBox.Indicator>
        </CheckBox.Root>
        <label
          className={`text-bold px-4 cursor-pointer ${
            isClicked && "line-through opacity-50"
          }`}
          htmlFor="c1"
        >
          Idle
        </label>
      </div>
    </form>
  );
};
export default Checkbox;
