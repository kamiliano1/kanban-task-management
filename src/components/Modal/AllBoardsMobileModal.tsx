import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import ButtonPrimaryBoards from "../Layout/Input/Button/ButtonPrimaryBoards";
import ThemeSwitcher from "../Layout/Input/ThemeSwitcher";
import { modalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { settingsState } from "../../atoms/settingsModal";
import { boardMobileModalState } from "../../atoms/boardsMobileModalAtom";
type AllBoardsMobileModalProps = { darkMode: boolean };
const AllBoardsMobileModal: React.FC<AllBoardsMobileModalProps> = ({
  darkMode,
}) => {
  const [boardMobileModalStates, setBoardMobileModalStates] = useRecoilState(
    boardMobileModalState
  );
  const [settingState, setSettingsState] = useRecoilState(settingsState);

  return (
    <Dialog.Root
      open={boardMobileModalStates.open}
      onOpenChange={() => {
        setBoardMobileModalStates({
          open: !boardMobileModalStates.open,
        });
      }}
    >
      {/* {activeModal === "allBoardsMobile" && (
      <AllBoardsMobileModal darkMode={darkMode} />
    )} */}
      {/* <Dialog.Trigger>
      <button className="">Edit profile</button>
    </Dialog.Trigger> */}
      {/* <EditTaskModal darkMode={darkMode} /> */}

      <Dialog.Portal>
        <Dialog.Overlay
          className="
        bg-black opacity-50 fixed inset-0
        "
        />

        <Dialog.Content
          className={`${
            darkMode ? "bg-darkGrey" : "bg-white"
          } data-[state=open]:animate-boardMobileShow fixed top-[70px] left-[50%] max-h-[85vh] w-[90vw]
        translate-x-[-50%] data-[state=closed]:animate-boardMobileHidden
        max-w-[264px] 
          rounded-[6px]
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
         focus:outline-none`}
        >
          <div className="flex flex-col pr-6">
            <Dialog.Title className="text-mediumGrey text-400 tracking-[2.4px] px-6 py-4">
              ALL BOARDS (3)
            </Dialog.Title>
            <ButtonPrimaryBoards buttonLabel="Platform Launch" />
            <ButtonPrimaryBoards buttonLabel="Marketing Plan" />
            <ButtonPrimaryBoards buttonLabel="RoadMap" />
            <ButtonPrimaryBoards buttonLabel="RoadMap" />
          </div>
          <ThemeSwitcher />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default AllBoardsMobileModal;
