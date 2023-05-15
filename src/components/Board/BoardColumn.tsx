import React from "react";
import { settingsState } from "../../atoms/settingsModal";
import { useRecoilState, useRecoilValue } from "recoil";
import ColumnElement from "./ColumnElement";

type BoardColumnProps = {};

const BoardColumn: React.FC<BoardColumnProps> = () => {
  const settingState = useRecoilValue(settingsState);
  const darkMode = settingState.darkMode;
  return (
    <div>
      <div className="flex items-center pb-6">
        <span className="bg-[#49C4E5] w-[15px] aspect-square rounded-full mr-3"></span>
        <h2 className="text-mediumGrey text-600 ">Todo (4)</h2>
      </div>
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
      <ColumnElement />
    </div>
  );
};
export default BoardColumn;
