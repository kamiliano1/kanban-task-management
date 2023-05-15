import React from "react";
import { settingsState } from "../../atoms/settingsModal";
import { useRecoilState, useRecoilValue } from "recoil";

type BoardProps = {};

const Board: React.FC<BoardProps> = () => {
  const settingState = useRecoilValue(settingsState);
  return (
    <div
      className={`bg-red w-full z-[-5] 
    h-full pt-6 ${
      settingState.isSidebarOpen
        ? "pl-[clamp(285px,_23vw,_324px)] animate-boardPaddingOpen"
        : "pl-6 animate-boardPaddingClose"
    }`}>
      Have a good codingg
    </div>
  );
};
export default Board;
