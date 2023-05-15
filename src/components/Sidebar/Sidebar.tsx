import React from "react";
import ButtonPrimaryBoards from "../Layout/Input/Button/ButtonPrimaryBoards";
import ThemeSwitcher from "../Layout/Input/ThemeSwitcher";
import HideSidebarButton from "./HideSidebarButton";
import { settingsState } from "../../atoms/settingsModal";
import { useRecoilState, useRecoilValue } from "recoil";
import ButtonAddBoard from "../Layout/Input/Button/ButtonAddBoard";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const [settingState, setSettingState] = useRecoilState(settingsState);
  return (
    <div
      className={`hidden sm:block fixed h-[100vh] left-0 top-0 z-[5] mt-[clamp(81px,_18vw,_97px)]
w-[clamp(261px,_23vw,_300px)] border-r-[1px] sm:pt-7
${
  settingState.isSidebarOpen
    ? "animate-sliderOpen"
    : "-translate-x-[100%] animate-sliderClose"
} ${
        settingState.darkMode
          ? "bg-darkGrey border-linesDark"
          : "bg-white border-linesLight"
      }`}
    >
      <div className="flex flex-col z-[5] pr-6 h-[calc(100vh_-_173px)]">
        <h2
          className="text-mediumGrey text-400 tracking-[2.4px] 
      sm:px-6 py-4 lg:pl-8"
        >
          ALL BOARDS (3)
        </h2>
        <ButtonPrimaryBoards buttonLabel="Platform Launch" />
        <ButtonPrimaryBoards buttonLabel="Marketing Plan" />
        <ButtonPrimaryBoards buttonLabel="RoadMap" />
        <ButtonAddBoard />
        <ThemeSwitcher />
        <HideSidebarButton />
      </div>
    </div>
  );
};
export default Sidebar;
