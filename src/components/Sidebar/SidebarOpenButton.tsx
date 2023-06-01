import React from "react";
import { FaEye } from "react-icons/fa";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { useRecoilState } from "recoil";

type SidebarOpenButtonProps = {};

const SidebarOpenButton: React.FC<SidebarOpenButtonProps> = () => {
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  return (
    <button
      className={`hidden bg-purple sm:flex items-center py-3 px-5 bottom-[calc(0px_+_32px)] rounded-[0px_100px_100px_0px] text-700
     hover:bg-lightPurple disabled:opacity-25 fixed`}
      onClick={() =>
        setSettingState((prev) => ({
          ...prev,
          isSidebarOpen: !settingState.isSidebarOpen,
        }))
      }
    >
      <span className="sr-only">Eye Icon</span>
      <FaEye />
    </button>
  );
};
export default SidebarOpenButton;
