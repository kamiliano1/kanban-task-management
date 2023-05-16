import React from "react";
import { settingsState } from "../../atoms/settingsModal";
import { useRecoilState, useRecoilValue } from "recoil";
import ColumnElement from "./ColumnElement";
import { TaskType } from "./BoardType";

type BoardColumnProps = {
  columnNamme: string;
  taskQty: number;
  tasks?: TaskType[];
};

const BoardColumn: React.FC<BoardColumnProps> = ({
  columnNamme,
  taskQty,
  tasks,
}) => {
  const settingState = useRecoilValue(settingsState);
  const darkMode = settingState.darkMode;
  const columnElements = tasks?.map((item) => (
    <ColumnElement
      key={item.title}
      taskName={item.title}
      subTasks={item.subtasks}
    />
  ));
  return (
    <div className="pl-6">
      <div className="flex items-center pb-6 w-[280px]">
        <span className="bg-[#49C4E5] w-[15px] aspect-square rounded-full mr-3"></span>
        <h2 className="text-mediumGrey text-600  ">
          {columnNamme} ({taskQty})
        </h2>
      </div>
      {columnElements}

      {/* <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement /> */}
    </div>
  );
};
export default BoardColumn;