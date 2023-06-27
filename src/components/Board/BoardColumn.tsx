import { boardsState } from "@/src/atoms/boardsAtom";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { TaskType } from "./BoardType";
import ColumnElement from "./ColumnElement";
type BoardColumnProps = {
  columnName: string;
  taskQty: number;
  tasks?: TaskType[];
  columnId: number;
  columnNumber: number;
};

const BoardColumn: React.FC<BoardColumnProps> = ({
  columnName,
  taskQty,
  tasks,
  columnId,
  columnNumber,
}) => {
  type DotColor = "bg-[#49C4E5]" | "bg-[#8471F2]" | "bg-[#67E2AE]";
  const [dotColor, setDotColor] = useState<DotColor>("bg-[#67E2AE]");
  const [taskListId, setTaskListId] = useState<number[]>([]);

  useEffect(() => {
    tasks?.length
      ? setTaskListId(tasks.map((task) => task.id))
      : setTaskListId([0]);
  }, [tasks]);

  const { setNodeRef } = useDroppable({ id: columnId.toString() });
  const { transform, transition } = useSortable({ id: columnName });
  const columnElements = tasks?.map((item) => (
    <ColumnElement
      key={item.id}
      taskName={item.title}
      subTasks={item.subtasks}
      taskId={item.id}
      columnId={columnId}
    />
  ));

  useEffect(() => {
    const purpleDotId = [1, 4, 7, 10, 13];
    if (columnNumber % 3 === 0 || columnNumber === 0) {
      setDotColor("bg-[#49C4E5]");
      return;
    }
    if (purpleDotId.includes(columnNumber)) {
      setDotColor("bg-[#8471F2]");
      return;
    }
    setDotColor("bg-[#67E2AE]");
  }, [columnNumber]);

  return (
    <div className="pl-6 touch-none self-start">
      <SortableContext
        id={columnId.toString()}
        items={taskListId}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex items-center pb-6 w-[280px]" ref={setNodeRef}>
          <span
            className={`${dotColor} w-[15px] aspect-square rounded-full mr-3`}
          ></span>
          <h2 className="text-mediumGrey text-600">
            {columnName} ({taskQty})
          </h2>
        </div>
        {columnElements}
      </SortableContext>
    </div>
  );
};
export default BoardColumn;
