import React, { useEffect, useState } from "react";

import { settingsModalState } from "../../atoms/settingsModalAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SubtasksType } from "./BoardType";
type ColumnElementProps = { taskName: string; subTasks: SubtasksType[] };

const ColumnElement: React.FC<ColumnElementProps> = ({
  taskName,
  subTasks,
}) => {
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const settingState = useRecoilValue(settingsModalState);
  const darkMode = settingState.darkMode;
  // console.log(subTasks.filter((item) => item.isCompleted));
  useEffect(() => {
    setCompletedTasks(subTasks.filter((item) => item.isCompleted).length);
  }, [subTasks]);
  return (
    <div
      className={`w-[280px] shadow-[0px_4px_6px_rgba(54,_78,_126,_0.101545)] z-[-30] mb-5 rounded-lg px-4 py-[1.4375rem] ${
        darkMode ? "bg-darkGrey" : "bg-white"
      }`}
    >
      <h3 className={`text-700 ${!darkMode && "text-black"}`}>{taskName}</h3>
      <p className="text-400 text-mediumGrey pt-2">
        {completedTasks} of {subTasks.length} substasks
      </p>
    </div>
  );
};
export default ColumnElement;
