import React, { useEffect, useState } from "react";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { BoardsAtom, boardsState } from "../../atoms/boardsAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import BoardColumn from "./BoardColumn";
import { BoardType } from "./BoardType";

type BoardProps = {};

const Board: React.FC<BoardProps> = () => {
  const settingState = useRecoilValue(settingsModalState);
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
  }, [settingState]);

  const activatedColumns = activatedBoard
    ? activatedBoard.columns.map((item) => (
        <BoardColumn
          key={item.id}
          columnNamme={item.name}
          tasks={item.tasks}
          taskQty={item.tasks.length}
        />
      ))
    : [];
  return (
    <div
      className={`${
        darkMode ? "bg-veryDarkGrey" : "bg-white"
      } w-full flex z-[-300] overflow-x-auto ml-[300px]
    h-full pt-6 ${
      settingState.isSidebarOpen
        ? "pl-[clamp(285px,_23vw,_300px)] animate-boardPaddingOpenn"
        : " animate-boardPaddingClosen"
    }`}
    >
      {activatedColumns}
    </div>
  );
};
export default Board;
