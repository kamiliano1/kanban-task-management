import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
type ThemeSwitcherProps = { darkMode: boolean };

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ darkMode }) => {
  console.log(darkMode);

  return (
    <div
      className={`flex items-center gap-x-6 bg-veryDarkGrey 
    rounded-md py-[.875rem] w-[251px] justify-center ${
      darkMode ? "bg-purple" : "bg-white"
    }`}
    >
      {" "}
      <BsFillSunFill className="text-mediumGrey" />
      <Switch.Root
        className={`w-[40px] h-[20px] bg-purple rounded-xl`}
        onCheckedChange={(checked) => console.log(checked)}
      >
        <Switch.Thumb
          className="block w-[14px] h-[14px] bg-white rounded-full 
        transition-transform duration-100 
        translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[23px]"
        />
      </Switch.Root>
      <BsMoonStarsFill className="text-mediumGrey" />
    </div>
  );
};
export default ThemeSwitcher;
