import React from "react";
import { TaskType } from "./BoardType";
import ColumnElement from "./ColumnElement";

type BoardColumnProps = {
  columnName: string;
  taskQty: number;
  tasks?: TaskType[];
  columnId: number;
};

const BoardColumn: React.FC<BoardColumnProps> = ({
  columnName,
  taskQty,
  tasks,
  columnId,
}) => {
  const columnElements = tasks?.map((item) => (
    <ColumnElement
      key={item.title}
      taskName={item.title}
      subTasks={item.subtasks}
      taskId={item.id}
      columnId={columnId}
    />
  ));
  return (
    <div className="pl-6">
      <div className="flex items-center pb-6 w-[280px]">
        <span className="bg-[#49C4E5] w-[15px] aspect-square rounded-full mr-3"></span>
        <h2 className="text-mediumGrey text-600  ">
          {columnName} ({taskQty})
        </h2>
      </div>
      {columnElements}
    </div>
  );
};
export default BoardColumn;
