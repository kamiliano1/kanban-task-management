import React, { useEffect, useState } from "react";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { BoardsAtom, boardsState } from "../../atoms/boardsAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import BoardColumn from "./BoardColumn";
import { BoardType, ColumnType, SubtasksType, TaskType } from "./BoardType";
import { customAlphabet } from "nanoid";
type BoardProps = {};

const Board: React.FC<BoardProps> = () => {
  const nanoid = customAlphabet("1234567890", 15);
  const settingState = useRecoilValue(settingsModalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [newBoardState, setNewBoardState] = useState<BoardType[]>(boardState);
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
  const aktywacja = () => {
    setNewBoardState((prev) =>
      prev.map((item) => ({ ...item, id: parseInt(nanoid()) }))
    );
    setNewBoardState((prev) =>
      prev.map((item) => {
        let subTask: SubtasksType;
        let letTask: TaskType;
        let letColumn: ColumnType;
        let letBoard: BoardType;
        letBoard = { ...item, columns: [] };
        item.columns.map((cols) => {
          letColumn = { ...cols, id: parseInt(nanoid()), tasks: [] };
          cols.tasks.map((task) => {
            letTask = { ...task, id: parseInt(nanoid()), subtasks: [] };
            task.subtasks.map((subtask) => {
              subTask = { ...subtask, id: parseInt(nanoid()) };
              letTask = {
                ...letTask,
                subtasks: [...letTask.subtasks, subTask],
              };

              // subTask = { ...subtask, id: parseInt(nanoid()) };
            });
            letColumn = {
              ...letColumn,
              tasks: [...letColumn.tasks, letTask],
            };
          });
          letBoard = {
            ...letBoard,
            columns: [...letBoard.columns, letColumn],
          };
        });
        return letBoard;
      })
    );
    console.log(newBoardState, "nowy");
  };
  const darkMode = settingState.darkMode;
  const activeBoard = settingState.activeBoard;
  useEffect(() => {
    setNewBoardState(boardState);
  }, [boardState]);
  useEffect(() => {
    setActivatedBoard(
      boardState.filter((board) => board.name === activeBoard)[0]
    );
  }, [activeBoard, boardState, settingState]);

  const activatedColumns = activatedBoard
    ? activatedBoard.columns.map((item) => (
        <BoardColumn
          key={item.id}
          id={parseInt(nanoid())}
          columnNamme={item.name}
          tasks={item.tasks}
          taskQty={item.tasks.length}
        />
      ))
    : [];
  return (
    <div
      onClick={aktywacja}
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
