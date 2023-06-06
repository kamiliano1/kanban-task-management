import React, { useEffect, useState } from "react";
import { TaskType } from "./BoardType";
import ColumnElement from "./ColumnElement";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRecoilState } from "recoil";
import { boardsState } from "@/src/atoms/boardsAtom";
import { useDroppable } from "@dnd-kit/core";
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
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [dotColor, setDotColor] = useState<DotColor>("bg-[#67E2AE]");
  const [taskListId, setTaskListId] = useState<number[]>([]);

  useEffect(() => {
    if (tasks) setTaskListId(tasks.map((task) => task.id));
  }, [tasks]);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: columnId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const columnElements = tasks?.map((item) => (
    <div key={item.title} ref={setNodeRef}>
      <ColumnElement
        taskName={item.title}
        subTasks={item.subtasks}
        taskId={item.id}
        columnId={columnId}
      />
    </div>
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
    <div className="pl-6">
      <div className="flex items-center pb-6 w-[280px]">
        <span
          className={`${dotColor} w-[15px] aspect-square rounded-full mr-3`}></span>
        <h2 className="text-mediumGrey text-600">
          {columnName} ({taskQty})
        </h2>
      </div>
      <SortableContext
        items={taskListId}
        id={columnId.toString()}
        strategy={verticalListSortingStrategy}>
        {columnElements}
      </SortableContext>
    </div>
    // <div className="pl-6" ref={setNodeRef} style={style} {...attributes}>
    //   <div className="flex items-center pb-6 w-[280px]" {...listeners}>
    //     <span
    //       className={`${dotColor} w-[15px] aspect-square rounded-full mr-3`}
    //     ></span>
    //     <h2 className="text-mediumGrey text-600">
    //       {columnName} ({taskQty})
    //     </h2>
    //   </div>
    //   {columnElements}
    // </div>
  );
};
export default BoardColumn;
