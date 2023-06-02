import React, { useEffect, useState } from "react";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { BoardsAtom, boardsState } from "../../atoms/boardsAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import BoardColumn from "./BoardColumn";
import { BoardType, ColumnType, SubtasksType, TaskType } from "./BoardType";
import { customAlphabet } from "nanoid";

import EmptyBoardInfo from "./EmptyBoardInfo";
import { modalState } from "@/src/atoms/modalAtom";
type BoardProps = {};

const Board: React.FC<BoardProps> = () => {
  const nanoid = customAlphabet("1234567890", 15);
  const settingState = useRecoilValue(settingsModalState);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [newBoardState, setNewBoardState] = useState<BoardType[]>(boardState);
  const [loading, setLoading] = useState<boolean>(true);
  const [activatedBoard, setActivatedBoard] = useState<BoardType>(
    boardState[0]
  );
  useEffect(() => {
    if (loading) {
      fetch("data/data.json")
        .then((res) => res.json())
        .then((data) => {
          setBoardState(data.boards);
          setBoardState((prev) =>
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
        });
      setLoading(false);
    }
  }, [loading, nanoid, setBoardState]);
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
          columnName={item.name}
          tasks={item.tasks}
          taskQty={item.tasks.length}
          columnId={item.id}
        />
      ))
    : [];
  return (
    <div
      className={`${
        darkMode ? "bg-veryDarkGrey" : "bg-white"
      } w-full flex z-[-300] overflow-x-auto  
    pt-6 pr-6 ${
      settingState.isSidebarOpen && "pl-[clamp(285px,_23vw,_300px)]"
    }`}
    >
      {activatedColumns.length ? activatedColumns : <EmptyBoardInfo />}
      <div className="flex justify-center items-center ml-6 w-[278px] mt-[2.4375rem] rounded-md bg-[linear-gradient(180deg,_rgba(43,_44,_55,_0.25)_0%,_rgba(43,_44,_55,_0.125)_100%)]">
        {" "}
        <button
          onClick={() => {
            setModalsState({ open: true, view: "editBoard" });
          }}
          className="text-900 text-mediumGrey hover:text-purple"
        >
          + New Column
        </button>
      </div>{" "}
    </div>
  );
};
export default Board;
