import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { settingsModalState } from "../../../atoms/settingsModalAtom";
import { useRecoilState, useRecoilValue } from "recoil";

type ThemeSwitcherProps = {};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = () => {
  const [settingState, setSettingsState] = useRecoilState(settingsModalState);
  const darkMode = settingState.darkMode;
  return (
    <div
      className={`flex items-center gap-x-6 bg-veryDarkGrey sm:mt-auto
    rounded-md py-[.875rem]  justify-center my-4 mx-4 ${
      darkMode ? "bg-purple" : "bg-white"
    }`}
    >
      {" "}
      <BsFillSunFill className="text-mediumGrey" />
      <Switch.Root
        checked={settingState.darkMode}
        className={`w-[40px] h-[20px] bg-purple rounded-xl`}
        onCheckedChange={(checked) =>
          setSettingsState((prev) => ({ ...prev, darkMode: checked }))
        }
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
