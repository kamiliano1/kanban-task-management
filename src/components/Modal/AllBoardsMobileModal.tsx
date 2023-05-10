import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import ButtonPrimaryBoards from "../Layout/Input/Button/ButtonPrimaryBoards";
type AllBoardsMobileModalProps = {};
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
const AllBoardsMobileModal: React.FC<AllBoardsMobileModalProps> = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="text-black shadow-blackA7 
        hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px]
         bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
        >
          Edit profile
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          className="data-[state=open]:animate-contentShow absolute top-[30%] left-[50%] max-h-[85vh] 
        w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px]
         bg-darkGrey 
         shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
         focus:outline-none"
        >
          <Dialog.Title className="text-mediumGrey text-400">
            ALL BOARDS (3)
          </Dialog.Title>
          <ButtonPrimaryBoards buttonLabel="Platform Launch" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default AllBoardsMobileModal;
