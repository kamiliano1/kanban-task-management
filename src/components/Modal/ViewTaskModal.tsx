import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Checkbox from "../Layout/Input/Checkbox";
import DropMenu from "../Layout/Input/DropMenu";
type ViewTaskModalProps = { darkMode: boolean };

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ darkMode }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* <Dialog.Trigger>
        <button className="">Edit profile</button>
      </Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px]
         translate-x-[-50%] translate-y-[-50%] rounded-[6px] ${
           darkMode ? "bg-darkGrey" : "bg-white"
         }
          p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
          focus:outline-none`}
        >
          <Dialog.Title
            className={` ${darkMode ? "text-white" : "text-black"} text-800`}
          >
            <div className="flex items-center">
              <p>
                {" "}
                Research pricing points of various competitors and trial
                different business models
              </p>
              <BiDotsVerticalRounded className="text-[3.5rem] text-mediumGrey cursor-pointer" />
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
            }`}
          >
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
            }`}
          >
            Current Status
          </p>
          <DropMenu darkMode={darkMode} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default ViewTaskModal;
