import React from "react";
import { FaEye } from "react-icons/fa";
import { settingsState } from "../../atoms/settingsModal";
import { useRecoilState, useRecoilValue } from "recoil";

type SidebarOpenButtonProps = {};

const SidebarOpenButton: React.FC<SidebarOpenButtonProps> = () => {
  const [settingState, setSettingState] = useRecoilState(settingsState);
  return (
    <button
      className={`bg-purple flex items-center py-3 px-5 absolute bottom-[calc(0px_+_32px)] rounded-[0px_100px_100px_0px] text-700
     hover:bg-lightPurple disabled:opacity-25 z-[-2]`}
      onClick={() =>
        setSettingState((prev) => ({
          ...prev,
          isSidebarOpen: !settingState.isSidebarOpen,
        }))
      }
    >
      {" "}
      <span className="sr-only">Eye Icon</span>
      <FaEye />
    </button>
  );
};
export default SidebarOpenButton;
