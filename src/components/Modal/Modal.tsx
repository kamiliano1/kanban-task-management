import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@/src/atoms/modalAtom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Checkbox from "../Layout/Input/Checkbox";
import DropMenu from "../Layout/Input/DropMenu";
import EditTaskModal from "./EditTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import AllBoardsMobileModal from "./AllBoardsMobileModal";
import { settingsState } from "@/src/atoms/settingsModal";
import { boardMobileModalState } from "../../atoms/boardsMobileModalAtom";
import AddBoardModal from "./AddBoardModal";

type ModalProps = {};

const Modal: React.FC<ModalProps> = () => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const settingState = useRecoilValue(settingsState);
  const activeModal = modalsState.view;
  const darkMode = settingState.darkMode;
  return (
    <Dialog.Root
      open={modalsState.open}
      onOpenChange={() => {
        setModalsState((prev) => ({
          ...prev,
          open: !modalsState.open,
        }));
      }}>
      <Dialog.Overlay
        className="
        bg-black opacity-50 fixed inset-0 z-[15]
        "
      />
      {activeModal === "editTask" && <EditTaskModal darkMode={darkMode} />}
      {activeModal === "viewTask" && <ViewTaskModal darkMode={darkMode} />}
      {activeModal === "addBoard" && <AddBoardModal darkMode={darkMode} />}
      {/* {activeModal === "allBoardsMobile" && (
        <AllBoardsMobileModal darkMode={darkMode} />
      )} */}
      {/* <Dialog.Trigger>
        <button className="">Edit profile</button>
      </Dialog.Trigger> */}
      {/* <EditTaskModal darkMode={darkMode} /> */}
    </Dialog.Root>
  );
};
export default Modal;
