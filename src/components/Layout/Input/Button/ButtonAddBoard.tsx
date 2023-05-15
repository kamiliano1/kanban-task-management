import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { settingsState } from "../../../../atoms/settingsModal";
import { useRecoilState } from "recoil";

type ButtonAddBoardProps = {};

const ButtonAddBoard: React.FC<ButtonAddBoardProps> = () => {
  const [settingState, setSettingState] = useRecoilState(settingsState);
  const darkMode = settingState.darkMode;
  return (
    <button
      //   onClick={() =>
      //     setSettingState((prev) => ({ ...prev, activeBoard: buttonLabel }))
      //   }
      className={`
        flex items-center py-3 px-5 text-purple lg:pl-8 rounded-[0px_100px_100px_0px] text-700
       hover:bg-white hover:text-purple disabled:opacity-25
        ${
          darkMode ? "hover:bg-white" : "hover:bg-purple hover:bg-opacity-10"
        }`}>
      <MdOutlineSpaceDashboard className="mr-3" /> + Create New Board
    </button>
  );
};
export default ButtonAddBoard;