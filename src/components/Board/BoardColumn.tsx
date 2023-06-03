import React, { useEffect, useState } from "react";
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

  const columnElements = tasks?.map((item) => (
    <ColumnElement
      key={item.title}
      taskName={item.title}
      subTasks={item.subtasks}
      taskId={item.id}
      columnId={columnId}
    />
  ));
  useEffect(() => {
    const purpleDotId = [1, 4, 7, 10, 13];
    if (columnNumber % 3 === 0 || columnNumber === 0)
      setDotColor("bg-[#49C4E5]");
    if (purpleDotId.includes(columnNumber)) setDotColor("bg-[#8471F2]");
  }, [columnNumber]);
  return (
    <div className="pl-6">
      <div className="flex items-center pb-6 w-[280px]">
        <span
          className={`${dotColor} w-[15px] aspect-square rounded-full mr-3`}></span>
        <h2 className="text-mediumGrey text-600  ">
          {columnName} ({taskQty})
        </h2>
      </div>
      {columnElements}
    </div>
  );
};
export default BoardColumn;
