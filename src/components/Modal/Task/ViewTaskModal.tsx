import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Checkbox from "../../Layout/Input/Checkbox";
import DropMenu from "../../Layout/Input/DropMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "../../../atoms/settingsModalAtom";
import { boardsState } from "../../../atoms/boardsAtom";
import { TaskType } from "../../Board/BoardType";

type ViewTaskModalProps = { darkMode: boolean };

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ darkMode }) => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);

  const [boardState, setBoardState] = useRecoilState(boardsState);

  const [activatedTask, setActivatedTask] = useState<TaskType>();

  const sprawdz = () => {
    // console.log(settingState);
    const currentBoard = boardState.find(
      (item) => item.name === settingState.activeBoard
    );
    const activatedColumn = currentBoard?.columns.find(
      (item) => item.id === settingState.activateColumn
    );
    console.log(activatedColumn);
    // const currentTask = currentBoard?.columns.
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="bg-blackA9 data-[state=open]:animate-overlayShow 
      fixed inset-0"
      />
      <Dialog.Content
        className={`data-[state=open]:animate-contentShow 
        fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px]
         translate-x-[-50%] translate-y-[-50%] rounded-[6px] z-[30] ${
           darkMode ? "bg-darkGrey" : "bg-white"
         }
          p-[25px] 
          shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
          focus:outline-none`}>
        <Dialog.Title
          className={` ${darkMode ? "text-white" : "text-black"} text-800`}>
          <div className="flex items-center">
            <p>
              {" "}
              Research pricing points of various competitors and trial different
              business models
            </p>
            {/* <BiDotsVerticalRounded
              className="text-[3.5rem] text-mediumGrey cursor-pointer"
              onClick={() =>
                setModalsState((prev) => ({ ...prev, view: "editTask" }))
              }
            /> */}
          </div>
        </Dialog.Title>
        <Dialog.Description className="text-mediumGrey my-[1.5rem] text-500">
          We know what we`re planning to build for version one. Now we need to
          finalise the first pricing model we`ll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </Dialog.Description>
        <Dialog.Description
          className={` pb-4 text-500 ${
            darkMode ? "text-white" : "text-mediumGrey"
          }`}>
          Subtasks (2 of 3)
        </Dialog.Description>
        <Checkbox
          checkboxLabel="Research competitor pricing and business models"
          darkMode={darkMode}
        />
        <Checkbox
          checkboxLabel="Outline a business model that works for our solution"
          darkMode={darkMode}
        />
        <Checkbox checkboxLabel="Surveying and testing" darkMode={darkMode} />
        <p
          className={` text-400 pt-4 pb-2 ${
            darkMode ? "text-white" : "text-mediumGrey"
          }`}>
          Current Status
        </p>
        <button onClick={sprawdz}>kkkkk</button>
        {/* <DropMenu darkMode={darkMode} /> */}
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default ViewTaskModal;
