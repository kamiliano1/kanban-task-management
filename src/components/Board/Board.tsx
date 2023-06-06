import React, { useEffect, useState } from "react";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { BoardsAtom, boardsState } from "../../atoms/boardsAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import BoardColumn from "./BoardColumn";
import { BoardType, ColumnType, SubtasksType, TaskType } from "./BoardType";
import { customAlphabet } from "nanoid";

import { modalState } from "@/src/atoms/modalAtom";
import AddColumn from "./AddColumn";
import NoColumnSection from "./NoColumnSection";
import NoBoardSection from "./NoBoardSection";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import ColumnElement from "./ColumnElement";
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

  const [columnsListId, setColumnsListId] = useState<number[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const [activeDragTask, setActiveTaskDrag] = useState<TaskType>();
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
  useEffect(() => {
    if (activatedBoard)
      setColumnsListId(activatedBoard.columns.map((column) => column.id));
  }, [activatedBoard]);
  const activatedColumns = activatedBoard
    ? activatedBoard.columns.map((item, number) => (
        <BoardColumn
          key={item.id}
          columnName={item.name}
          tasks={item.tasks}
          taskQty={item.tasks.length}
          columnId={item.id}
          columnNumber={number}
        />
      ))
    : [];

  const handleDragStart = (e: DragEndEvent) => {
    const { active, over } = e;

    const activeTaskId = active.id;
    const activeTaskColumn: number = Number(
      active.data?.current?.sortable.containerId
    );
    setActiveTaskDrag(
      activatedBoard.columns
        .find((cols) => cols.id === activeTaskColumn)
        ?.tasks.find((task) => task.id === activeTaskId)
    );
  };

  const handleDragOver = (e: DragEndEvent) => {
    const { active, over } = e;
    const activeId = active.id;
    const overId = over?.id;
    const activeColumnId: number = Number(
      active.data?.current?.sortable.containerId
    );
    const targetColumnId: number = Number(
      over?.data?.current?.sortable.containerId
    );
    let activeColumn = activatedBoard.columns.find(
      (cols) => cols.id === activeColumnId
    );
    let targetColumn = activatedBoard.columns.find(
      (cols) => cols.id === targetColumnId
    );
    const activeIndex = activeColumn?.tasks.findIndex(
      (task) => task.id === activeId
    );
    const overIndex = targetColumn?.tasks.findIndex(
      (task) => task.id === overId
    );

    if (!activeColumn || !targetColumn) return;
    let newIndex: number;
    setActivatedBoard((prev) => {
      let boardColumns = prev.columns;
      boardColumns = prev.columns.map((cols, index) => {
        if (cols.id === activeColumn?.id) {
          return {
            ...cols,
            tasks: cols.tasks.filter((task) => task.id !== activeId),
          };
        }

        const isBelowOverItem =
          e.over &&
          e.active.rect.current.translated &&
          e.active.rect.current.translated.top >
            e.over.rect.top + e.over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex =
          overIndex! >= 0
            ? overIndex! + modifier
            : targetColumn!.tasks.length + 1;
        return cols;
      });
      return prev;
      return { ...prev, columns: boardColumns };
    });
  };
  const handleDragDrop = (e: DragEndEvent) => {
    // console.log(e.active, "start");
    // console.log(e.over, "stop");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-veryDarkGrey" : "bg-white"
      } w-full flex z-[-300] overflow-x-auto h-[calc(100vh_-_clamp(64.75px,_10vw,_97px))] ${
        !activatedColumns.length && "justify-center"
      }
    pt-6 pr-6 ${
      settingState.isSidebarOpen && "pl-[clamp(285px,_23vw,_300px)]"
    }`}>
      {boardState.length ? (
        <>
          {activatedColumns.length ? (
            <>
              {/* <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragDrop}
                sensors={sensors}
              > */}
              {/* <SortableContext
                  items={columnsListId}
                  strategy={horizontalListSortingStrategy}
                > */}
              <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragDrop}
                sensors={sensors}>
                {activatedColumns}
                <DragOverlay>
                  {activeDragTask ? (
                    <ColumnElement
                      taskName={activeDragTask.title}
                      subTasks={activeDragTask.subtasks}
                      taskId={activeDragTask.id}
                      columnId={activeDragTask.id}
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>
              {/* </SortableContext> */}
              {/* </DndContext> */}
              <AddColumn />
            </>
          ) : (
            <NoColumnSection />
          )}
        </>
      ) : (
        <NoBoardSection />
      )}
    </div>
  );
};
export default Board;
