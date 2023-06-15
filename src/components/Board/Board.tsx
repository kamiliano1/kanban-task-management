import { customAlphabet } from "nanoid";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardsState } from "../../atoms/boardsAtom";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import BoardColumn from "./BoardColumn";
import { BoardType, ColumnType, SubtasksType, TaskType } from "./BoardType";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { modalState } from "@/src/atoms/modalAtom";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddColumn from "./AddColumn";
import ColumnElement from "./ColumnElement";
import NoBoardSection from "./NoBoardSection";
import NoColumnSection from "./NoColumnSection";
import { auth, firestore } from "@/src/firebase/clientApp";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import ColumnsSkeleton from "./ColumnsSkeleton";
type BoardProps = {};

const Board: React.FC<BoardProps> = () => {
  const nanoid = customAlphabet("1234567890", 15);
  const [settingState, setSettingsState] = useRecoilState(settingsModalState);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [newBoardState, setNewBoardState] = useState<BoardType[]>(boardState);
  const [loading, setLoading] = useState<boolean>(true);
  const [isColumnMoved, setIsColumnMoved] = useState(false);
  // const [user] = useAuthState(auth);
  const [user, firebaseLoading, error] = useAuthState(auth);
  const [activatedBoard, setActivatedBoard] = useState<BoardType>(
    boardState[0]
  );
  const [columnsListId, setColumnsListId] = useState<string[]>(["addColumn"]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const [activeDragTask, setActiveDragTask] = useState<TaskType | null>();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataRef = doc(firestore, "users", user!.uid);
        const userData = await getDoc(userDataRef);
        const bookmarkData = userData.data();

        if (bookmarkData) {
          setBoardState(bookmarkData.board || []);
        }
      } catch (error: any) {
        console.log("getBookmarkError", error.message);
      }
    };
    if (!firebaseLoading) {
      if (user) {
        // getUserData();
        setLoading(false);
        return;
      }
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
    }
  }, [firebaseLoading, loading, nanoid, setBoardState, user]);

  useEffect(() => {
    if (!settingState.isLoaded)
      setTimeout(() => {
        setSettingsState((prev) => ({ ...prev, isLoaded: true }));
      }, 300);
  }, [setBoardState, setSettingsState, settingState.isLoaded]);
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
    if (activatedBoard) {
      setColumnsListId(activatedBoard.columns.map((column) => column.name));

      setColumnsListId((prev) => [...prev, "addColumn"]);
    }
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

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const activeTaskId = active.id;
    const activeTaskColumn: number = Number(
      active.data?.current?.sortable.containerId
    );
    setActiveDragTask(
      activatedBoard.columns
        .find((cols) => cols.id === activeTaskColumn)
        ?.tasks.find((task) => task.id === activeTaskId)
    );
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    const activeId = active.id;
    const overId = over?.id;
    const activeColumnId: number = Number(
      active.data?.current?.sortable?.containerId
    );
    const targetColumnId: number = Number(
      over?.data?.current?.sortable?.containerId
    );

    let activeColumn = activatedBoard.columns.find(
      (cols) => cols.id === activeColumnId
    );
    let targetColumn = activatedBoard.columns.find((cols) => {
      return !targetColumnId
        ? cols.id === Number(overId)
        : cols.id === targetColumnId;
    });
    const activeIndex = activeColumn?.tasks.findIndex(
      (task) => task.id === activeId
    );
    const overIndex = targetColumn?.tasks.findIndex(
      (task) => task.id === overId
    );
    if (!activeColumn || !targetColumn || activeColumn === targetColumn) return;
    let newIndex: number;
    setActivatedBoard((prev) => {
      let boardColumns = prev.columns;
      boardColumns = prev.columns.map((cols) => {
        const isBelowOverItem =
          e.over &&
          e.active.rect.current.translated &&
          e.active.rect.current.translated.top >
            e.over.rect.top + e.over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        if (cols.id === activeColumn?.id) {
          return {
            ...cols,
            tasks: cols.tasks.filter((task) => task.id !== activeId),
          };
        }
        if (cols.id === targetColumn?.id) {
          newIndex =
            overIndex! >= 0
              ? overIndex! + modifier
              : targetColumn!.tasks.length + 1;
          return {
            ...cols,
            tasks: [
              ...cols.tasks.slice(0, newIndex),
              {
                ...activeColumn?.tasks[activeIndex || 0],
                status: targetColumn.name,
              },
              ...cols.tasks.slice(newIndex, targetColumn?.tasks.length),
            ] as TaskType[],
          };
        }
        return cols;
      });
      return { ...prev, columns: boardColumns };
    });
    if (isColumnMoved) setIsColumnMoved(false);
  };

  const handleDragDrop = (e: DragEndEvent) => {
    const { active, over } = e;
    const activeId = active.id;
    const overId = over?.id;
    if (activatedBoard.columns.find((col) => col.name === active.id)) {
      setIsColumnMoved(true);
      setActivatedBoard((prev) => {
        const activeColumn = activatedBoard.columns.findIndex(
          (col) => col.name === activeId
        );
        const targetColumn = activatedBoard.columns.findIndex(
          (col) => col.name === overId
        );

        return {
          ...prev,
          columns: arrayMove(prev.columns, activeColumn, targetColumn),
        };
      });
      return;
    }
    const activeColumnId: number = Number(
      active.data?.current?.sortable?.containerId
    );
    const targetColumnId: number = Number(
      over?.data?.current?.sortable?.containerId
    );
    let activeColumn = activatedBoard.columns.find(
      (cols) => cols.id === activeColumnId
    );
    let targetColumn = activatedBoard.columns.find(
      (cols) => cols.id === targetColumnId
    );

    if (!activeColumn || !targetColumn || activeColumn !== targetColumn) return;
    const activeIndex = activeColumn?.tasks.findIndex(
      (task) => task.id === activeId
    );
    const overIndex = targetColumn?.tasks.findIndex(
      (task) => task.id === overId
    );
    if (activeIndex === overIndex) return;

    setActivatedBoard((prev) => {
      let boardColumns = prev.columns;
      boardColumns = prev.columns.map((cols) => {
        if (cols.id === activeColumn?.id) {
          return {
            ...cols,
            tasks: arrayMove(cols.tasks, activeIndex, overIndex),
          };
        }
        return cols;
      });
      return { ...prev, columns: boardColumns };
    });

    setActiveDragTask(null);
  };
  useEffect(() => {
    const updateBoardState = setTimeout(async () => {
      const updatedBoard = boardState.map((board) =>
        board.name === settingState.activeBoard ? activatedBoard : board
      );
      setBoardState(updatedBoard);
      if (user) {
        const boardRef = doc(firestore, `users/${user?.uid}`);
        await updateDoc(boardRef, {
          board: updatedBoard,
        });
      }
    }, 1000);
    updateBoardState;
    return () => clearTimeout(updateBoardState);
  }, [
    activatedBoard,
    boardState,
    setBoardState,
    settingState.activeBoard,
    user,
  ]);

  return (
    <div
      className={`${
        darkMode ? "bg-veryDarkGrey" : "bg-white"
      } w-full flex z-[-300] overflow-x-auto h-[calc(100vh_-_clamp(64.75px,_10vw,_97px))] 
    pt-6 pr-6 ${
      settingState.isSidebarOpen && "pl-[clamp(285px,_23vw,_300px)]"
    }`}
    >
      {" "}
      {settingState.isLoaded ? (
        <>
          {boardState.length ? (
            <>
              {activatedColumns.length ? (
                <>
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragDrop}
                    sensors={sensors}
                  >
                    <SortableContext
                      items={columnsListId}
                      strategy={horizontalListSortingStrategy}
                    >
                      {activatedColumns}
                      <AddColumn />
                    </SortableContext>
                    {!isColumnMoved && (
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
                    )}
                  </DndContext>
                </>
              ) : (
                <NoColumnSection />
              )}
            </>
          ) : (
            <NoBoardSection />
          )}
        </>
      ) : (
        <ColumnsSkeleton darkMode={darkMode} />
      )}
    </div>
  );
};
export default Board;
