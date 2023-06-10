import React, { useEffect, useState } from "react";
import { TaskType } from "./BoardType";
import ColumnElement from "./ColumnElement";
import {
  SortableContext,
  horizontalListSortingStrategy,
  rectSwappingStrategy,
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
    tasks?.length
      ? setTaskListId(tasks.map((task) => task.id))
      : setTaskListId([0]);
  }, [tasks]);

  const { setNodeRef } = useDroppable({ id: columnId.toString() });
  const {
    attributes,
    listeners,
    setNodeRef: setNodeRefSortable,
    transform,
    transition,
  } = useSortable({ id: columnName });
  const columnElements = tasks?.map((item) => (
    <ColumnElement
      key={item.id}
      taskName={item.title}
      subTasks={item.subtasks}
      taskId={item.id}
      columnId={columnId}
    />
  ));
  // console.log(taskListId);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <div
      className="pl-6"
      ref={setNodeRefSortable}
      style={style}
      {...attributes}
    >
      <SortableContext
        id={columnId.toString()}
        items={taskListId}
        strategy={rectSwappingStrategy}
      >
        <div className="flex items-center pb-6 w-[280px]" ref={setNodeRef}>
          <span
            className={`${dotColor} w-[15px] aspect-square rounded-full mr-3`}
          ></span>
          <h2 className="text-mediumGrey text-600">
            {columnName} ({taskQty})
          </h2>
          <p {...listeners} className="ml-auto">
            Reka
          </p>
        </div>
        {columnElements}
      </SortableContext>
    </div>
  );
};
export default BoardColumn;
