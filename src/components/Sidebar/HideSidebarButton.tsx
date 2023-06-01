import React from "react";
import { BiHide } from "react-icons/bi";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { useRecoilState } from "recoil";

type HideSidebarButtonProps = {};

const HideSidebarButton: React.FC<HideSidebarButtonProps> = () => {
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const darkMode = settingState.darkMode;
  return (
    <div
      onClick={() =>
        setSettingState((prev) => ({
          ...prev,
          isSidebarOpen: false,
        }))
      }
      className={`text-mediumGrey py-3 cursor-pointer flex items-center gap-x-4 sm:px-6
    lg:pl-8 rounded-[0px_100px_100px_0px] hover:text-purple ${
      darkMode ? "hover:bg-white" : "hover:bg-purple hover:bg-opacity-10"
    } `}
    >
      <BiHide />
      <p>Hide Sidebar</p>
    </div>
  );
};
export default HideSidebarButton;
