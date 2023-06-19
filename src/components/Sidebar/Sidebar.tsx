import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import ButtonAddBoard from "../Layout/Input/Button/ButtonAddBoard";
import ButtonPrimaryBoards from "../Layout/Input/Button/ButtonPrimaryBoards";
import ThemeSwitcher from "../Layout/Input/ThemeSwitcher";
import HideSidebarButton from "./HideSidebarButton";

import { auth, firestore } from "@/src/firebase/clientApp";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { boardsState } from "../../atoms/boardsAtom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import BoardsSkeleton from "./BoardsSkeleton";
import DropMenu from "../Layout/Input/DropMenu";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const [user] = useAuthState(auth);
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

  const boardList = boardState?.map((item) => (
    <ButtonPrimaryBoards key={item.name} buttonLabel={item.name} />
  ));
  const [boardsList, setBoardsList] = useState<string[]>([]);

  useEffect(() => {
    setBoardsList(boardState.map((board) => board.name));
  }, [boardState]);
  const handleDragDrop = async (e: DragEndEvent) => {
    if (e.active.id === e.over?.id) return;
    const activeBoard = boardState.findIndex(
      (board) => board.name === e.active.id
    );
    const targetBoard = boardState.findIndex(
      (board) => board.name === e.over?.id
    );
    const updatedBoard = arrayMove(boardState, activeBoard, targetBoard);
    setBoardState(updatedBoard);
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        board: updatedBoard,
      });
    }
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
      <div className="flex flex-col z-[5] pr-6 h-[calc(100vh_-_120px)]">
        {settingState.isLoaded ? (
          <>
            {" "}
            <h2
              className="text-mediumGrey text-400 tracking-[2.4px] 
      sm:px-6 py-4 lg:pl-8"
            >
              ALL BOARDS ({boardState?.length})
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
          </>
        ) : (
          <BoardsSkeleton darkMode={settingState.darkMode} />
        )}

        <ThemeSwitcher />
        {user ? <LogoutButton /> : <LoginButton />}
        <HideSidebarButton />
      </div>
    </div>
  );
};
export default Sidebar;
