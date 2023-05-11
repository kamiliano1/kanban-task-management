import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import ButtonPrimaryBoards from "../Layout/Input/Button/ButtonPrimaryBoards";
import ThemeSwitcher from "../Layout/Input/ThemeSwitcher";
import { modalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
type AllBoardsMobileModalProps = {};
const AllBoardsMobileModal: React.FC<AllBoardsMobileModalProps> = () => {
  const [boardState, setBoardState] = useRecoilState(modalState);
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-overlayShow bg-black opacity-50 fixed inset-0" />

      <Dialog.Content
        className="data-[state=open]:animate-contentShow absolute top-[86px] left-[calc(50%-155px)]
        max-w-[264px] 
          rounded-[6px]
        bg-darkGrey p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      >
        <div className="flex flex-col pr-6">
          <Dialog.Title className="text-mediumGrey text-400 tracking-[2.4px]  px-6 pb-4">
            ALL BOARDS (3)
          </Dialog.Title>
          <ButtonPrimaryBoards buttonLabel="Platform Launch" />
          <ButtonPrimaryBoards buttonLabel="Marketing Plan" />
          <ButtonPrimaryBoards buttonLabel="RoadMap" />
          <ButtonPrimaryBoards buttonLabel="RoadMap" />
        </div>
        <ThemeSwitcher darkMode={true} />
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default AllBoardsMobileModal;
