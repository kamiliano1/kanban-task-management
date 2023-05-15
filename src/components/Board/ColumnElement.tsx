import React from "react";

import { settingsState } from "../../atoms/settingsModal";
import { useRecoilState, useRecoilValue } from "recoil";
type ColumnElementProps = {};

const ColumnElement: React.FC<ColumnElementProps> = () => {
  const settingState = useRecoilValue(settingsState);
  const darkMode = settingState.darkMode;
  return (
    <div
      className={`w-[280px] shadow-[0px_4px_6px_rgba(54,_78,_126,_0.101545)] z-[-30] mb-5 rounded-lg px-4 py-[1.4375rem] ${
        darkMode ? "bg-darkGrey" : "bg-white"
      }`}
    >
      <h3 className={`text-700 ${!darkMode && "text-black"}`}>
        Build UI for onboarding flow
      </h3>
      <p className="text-400 text-mediumGrey pt-2">0 of 3 substasks</p>
    </div>
  );
};
export default ColumnElement;
