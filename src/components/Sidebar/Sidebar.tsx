import React, { useEffect, useState } from "react";
import ButtonPrimaryBoards from "../Layout/Input/Button/ButtonPrimaryBoards";
import ThemeSwitcher from "../Layout/Input/ThemeSwitcher";
import HideSidebarButton from "./HideSidebarButton";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import ButtonAddBoard from "../Layout/Input/Button/ButtonAddBoard";
import { AiOutlineUser } from "react-icons/ai";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BoardsAtom, boardsState } from "../../atoms/boardsAtom";
import LoginButton from "./LoginButton";
type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);

  const [loading, setLoading] = useState<boolean>(true);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  useEffect(() => {
    if (loading && boardState.length) {
      setSettingState((prev) => ({
        ...prev,
        activeBoard: boardState[0].name,
      }));
      setLoading(false);
    }
  }, [boardState, loading, setSettingState]);

  const boardList = boardState.map((item) => (
    <ButtonPrimaryBoards key={item.name} buttonLabel={item.name} />
  ));
  const [boardsList, setBoardsList] = useState<string[]>([]);

  useEffect(() => {
    setBoardsList(boardState.map((board) => board.name));
  }, [boardState]);
  const handleDragDrop = (e: DragEndEvent) => {
    setBoardState((board) => {
      const activeBoard = board.findIndex(
        (board) => board.name === e.active.id
      );
      const targetBoard = board.findIndex((board) => board.name === e.over?.id);
      return arrayMove(board, activeBoard, targetBoard);
    });
  };

  return (
    <div
      className={`hidden sm:block fixed h-[100vh] left-0 top-[clamp(64.75px,_10vw,_97px)] z-[5] 
w-[clamp(261px,_23vw,_300px)] border-r-[1px]
${
  settingState.isSidebarOpen
    ? "animate-sliderOpen"
    : "-translate-x-[100%] animate-sliderClose"
} ${
        settingState.darkMode
          ? "bg-darkGrey border-linesDark"
          : "bg-white border-linesLight"
      }`}
    >
      <div className="flex flex-col z-[5] pr-6 h-[calc(100vh_-_120px)] ">
        <h2
          className="text-mediumGrey text-400 tracking-[2.4px] 
      sm:px-6 py-4 lg:pl-8"
        >
          ALL BOARDS ({boardState.length})
        </h2>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragDrop}
          sensors={sensors}
        >
          <SortableContext
            items={boardsList}
            strategy={verticalListSortingStrategy}
          >
            {boardList}
          </SortableContext>
        </DndContext>
        <ButtonAddBoard />
        <ThemeSwitcher />
        <LoginButton />
        <HideSidebarButton />
      </div>
    </div>
  );
};
export default Sidebar;
