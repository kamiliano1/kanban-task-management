import React from "react";
import ButtonPrimaryBoards from "../Layout/Input/Button/ButtonPrimaryBoards";
import ThemeSwitcher from "../Layout/Input/ThemeSwitcher";
import HideSidebar from "./HideSidebar";
import { settingsState } from "../../atoms/settingsModal";
import { useRecoilState, useRecoilValue } from "recoil";
import ButtonAddBoard from "../Layout/Input/Button/ButtonAddBoard";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const [settingState, setSettingState] = useRecoilState(settingsState);
  return (
    <div
      className="flex flex-col pr-6 h-[calc(100vh_-_173px)]"
      //   onClick={() =>
      //     setSettingState((prev) => ({
      //       ...prev,
      //       isSidebarOpen: !settingState.isSidebarOpen,
      //     }))
      //   }
    >
      <h2 className="text-mediumGrey text-400 tracking-[2.4px] sm:px-6 py-4 lg:pl-8">
        ALL BOARDS (3)
      </h2>
      <ButtonPrimaryBoards buttonLabel="Platform Launch" />
      <ButtonPrimaryBoards buttonLabel="Marketing Plan" />
      <ButtonPrimaryBoards buttonLabel="RoadMap" />
      <ButtonAddBoard />
      <ThemeSwitcher />
      {/* <h1 className=" bg-red text-[5rem] mt-auto">aa</h1> */}
      <HideSidebar />
    </div>
  );
};
export default Sidebar;
