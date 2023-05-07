"use client";
import React, { useState } from "react";

import * as CheckBox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

type CheckboxProps = {};

const Checkbox: React.FC<CheckboxProps> = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <form>
      <div className="flex items-center justify-start hover:bg-lightPurple text-black text-400 py-3 px-3">
        <CheckBox.Root
          className="w-4 aspect-square border-[1px] border-[rgba(130,_143,_163,_0.248914)] "
          checked={isClicked}
          onClick={() => setIsClicked((prev) => !prev)}
          id="c1"
        >
          <CheckBox.Indicator className="">
            <CheckIcon className="text-white bg-purple" />
          </CheckBox.Indicator>
        </CheckBox.Root>
        <label
          className={`text-bold px-4 cursor-pointer ${
            isClicked && "line-through opacity-50"
          }`}
          htmlFor="c1"
        >
          Accept terms and conditions.
        </label>
      </div>
    </form>
  );
};
export default Checkbox;
