import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { settingsState } from "../../../../atoms/settingsModal";
import { useRecoilState } from "recoil";
type ButtonPrimaryBoardsProps = { buttonLabel: string };

const ButtonPrimaryBoards: React.FC<ButtonPrimaryBoardsProps> = ({
  buttonLabel,
}) => {
  const [settingState, setSettingState] = useRecoilState(settingsState);
  const activeBoard = settingState.activeBoard;
  const darkMode = settingState.darkMode;
  // const buttonBackground =
  return (
    <button
      onClick={() =>
        setSettingState((prev) => ({ ...prev, activeBoard: buttonLabel }))
      }
      className={`${
        activeBoard === buttonLabel
          ? "bg-purple text-wwhite"
          : "text-mediumGrey"
      }  flex items-center py-3 px-5 lg:pl-8 rounded-[0px_100px_100px_0px] text-700
       
       ${
         darkMode ? "hover:bg-white" : "hover:bg-purple hover:bg-opacity-10"
       } hover:text-purple disabled:opacity-25`}>
      <MdOutlineSpaceDashboard className="mr-3" /> {buttonLabel}
    </button>
  );
};
export default ButtonPrimaryBoards;
