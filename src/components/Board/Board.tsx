import React from "react";
import { settingsState } from "../../atoms/settingsModal";
import { useRecoilState, useRecoilValue } from "recoil";
import BoardColumn from "./BoardColumn";

type BoardProps = {};

const Board: React.FC<BoardProps> = () => {
  const settingState = useRecoilValue(settingsState);
  const darkMode = settingState.darkMode;
  return (
    <div
      className={`${
        darkMode ? "bg-veryDarkGrey" : "bg-white"
      } w-full flex gap-x-6 z-[-300] overflow-x-auto
    h-full pt-6 pl-6 ${
      settingState.isSidebarOpen
        ? "pl-[clamp(285px,_23vw,_324px)] animate-boardPaddingOpenn"
        : "pl-6 animate-boardPaddingClosen"
    }`}
    >
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
      <BoardColumn />
    </div>
  );
};
export default Board;
