import React, { useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { modalState } from "@/src/atoms/modalAtom";
import { useRecoilState } from "recoil";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { SubtasksType } from "./BoardType";
import { useSortable } from "@dnd-kit/sortable";

type ColumnElementProps = {
  taskName: string;
  subTasks: SubtasksType[];
  taskId: number;
  columnId: number;
};

const ColumnElement: React.FC<ColumnElementProps> = ({
  taskName,
  subTasks,
  taskId,
  columnId,
}) => {
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const darkMode = settingState.darkMode;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: taskId });
  const viewTask = () => {
    setSettingState((prev) => ({
      ...prev,
      activateTask: taskId,
      activateColumn: columnId,
      activateTaskName: taskName,
    }));
    setModalsState({ open: true, view: "viewTask" });
  };
  useEffect(() => {
    setCompletedTasks(subTasks.filter((item) => item.isCompleted).length);
  }, [subTasks]);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      onClick={viewTask}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-[280px] cursor-pointer 
      shadow-[0px_4px_6px_rgba(54,_78,_126,_0.101545)]
       z-[-30] mb-5 rounded-lg px-4 py-[1.4375rem] hover:bg-opacity-80 ${
         darkMode ? "bg-darkGrey" : "bg-white"
       }`}
    >
      <h3 className={`text-700 ${!darkMode && "text-black"}`}>{taskName}</h3>
      <p className="text-400 text-mediumGrey pt-2">
        {completedTasks} of {subTasks?.length} substasks
      </p>
    </div>
  );
};
export default ColumnElement;
