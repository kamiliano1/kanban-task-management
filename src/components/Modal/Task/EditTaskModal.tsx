import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Checkbox from "../../Layout/Input/Checkbox";
import DropMenu from "../../Layout/Input/DropMenu";
import { useRecoilState } from "recoil";
import { modalState } from "@/src/atoms/modalAtom";
import TextField from "../../Layout/Input/TextField";
import TextArea from "../../Layout/Input/TextArea";

type EditTaskModalProps = {
  darkMode: boolean;
};

const EditTaskModal: React.FC<EditTaskModalProps> = ({ darkMode }) => {
  return (
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
            <p>Edit Task</p>
          </div>
        </Dialog.Title>

        <Dialog.Description
          className={` pb-4 text-500 ${
            darkMode ? "text-white" : "text-mediumGrey"
          }`}
        >
          Subtasks (2 of 3)
        </Dialog.Description>
        <TextField title={"Title"} darkMode={darkMode} placeholder="WPISAC!!" />
        <TextArea darkMode={darkMode} />
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
        {/* <DropMenu darkMode={darkMode} /> */}
        <Dialog.Close asChild>
          <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
            Save changes
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default EditTaskModal;
