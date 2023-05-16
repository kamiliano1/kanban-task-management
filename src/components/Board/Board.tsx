import React, { useEffect, useState } from "react";
import { settingsState } from "../../atoms/settingsModal";
import {
  BoardType,
  BoardsAtom,
  ColumnType,
  boardsState,
} from "../../atoms/boardsAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import BoardColumn from "./BoardColumn";

type BoardProps = {};

const Board: React.FC<BoardProps> = () => {
  const settingState = useRecoilValue(settingsState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [activatedBoard, setActivatedBoard] = useState<BoardType>(
    boardState[0]
  );
  useEffect(() => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setBoardState(data.boards);
      });
  }, []);
  // console.log(boardState[0]);

  const darkMode = settingState.darkMode;
  const activeBoard = settingState.activeBoard;

  useEffect(() => {
    setActivatedBoard(
      boardState.filter((board) => board.name === activeBoard)[0]
    );
    console.log(activatedBoard, "aa");
  }, [settingState]);

  const activatedColumns = activatedBoard.columns.map((item) => (
    <BoardColumn columnNamme={item.name} />
  ));
  return (
    <div
      className={`${
        darkMode ? "bg-veryDarkGrey" : "bg-white"
      } w-full flex gap-x-6 z-[-300] overflow-x-auto
    h-full pt-6 pl-6 ${
      settingState.isSidebarOpen
        ? "pl-[clamp(285px,_23vw,_324px)] animate-boardPaddingOpenn"
        : "pl-6 animate-boardPaddingClosen"
    }`}>
      {activatedColumns}
      {/* <BoardColumn />
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
      <BoardColumn /> */}
    </div>
  );
};
export default Board;
