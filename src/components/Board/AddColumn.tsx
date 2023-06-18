import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "@/src/atoms/settingsModalAtom";
import React from "react";
import { useRecoilState } from "recoil";

type AddColumnProps = {};

const AddColumn: React.FC<AddColumnProps> = () => {
  const [settingState, setSettingsState] = useRecoilState(settingsModalState);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const darkMode = settingState.darkMode;
  return (
    <div
      className={`flex justify-center items-center ml-6 w-[278px] mt-[2.4375rem] rounded-md mb-[2rem]
    ${
      darkMode
        ? "bg-[linear-gradient(180deg,_rgba(43,_44,_55,_0.25)_0%,_rgba(43,_44,_55,_0.125)_100%)] "
        : "bg-[inear-gradient(180deg,_#E9EFFA 0%,_rgba(233,_239,_250,_0.5)_100%)]"
    }
    `}
    >
      {" "}
      <button
        onClick={() => {
          setModalsState({ open: true, view: "editBoard" });
        }}
        className="px-5 text-900-mobile sm:text-900-tablet lg:text-900-desktop text-mediumGrey hover:text-purple "
      >
        + New Column
      </button>
    </div>
  );
};
export default AddColumn;
