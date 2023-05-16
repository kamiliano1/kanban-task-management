import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TextField from "../Layout/Input/TextField";
import Checkbox from "../Layout/Input/Checkbox";
import DropMenu from "../Layout/Input/DropMenu";
import TextArea from "../Layout/Input/TextArea";
import ButtonSecondary from "../Layout/Input/Button/ButtonSecondary";
import ButtonPrimarySmall from "../Layout/Input/Button/ButtonPrimarySmall";
import AddElementInput from "../Layout/Input/AddElementInput";
import { BoardType } from "../Board/BoardType";
import { nanoid } from "nanoid";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
type AddBoardModalProps = {
  darkMode: boolean;
};
interface IFormInputs {
  TextField: string;
  MyCheckbox: boolean;
}
const AddBoardModal: React.FC<AddBoardModalProps> = ({ darkMode }) => {
  const [newBoard, setNewBoard] = useState<BoardType>({
    name: "",
    id: nanoid(),
    columns: [],
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);
  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
      MyCheckbox: false,
    },
  });
  return (
    <Dialog.Portal>
      <Dialog.Content
        className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px]
     translate-x-[-50%] translate-y-[-50%] rounded-[6px] z-[30] ${
       darkMode ? "bg-darkGrey" : "bg-white"
     }
      p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
      focus:outline-none`}
      >
        <Dialog.Title
          className={` ${darkMode ? "text-white" : "text-black"} text-800 pb-4`}
        >
          Add New Board
        </Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Root className="text-500">
            <Form.Field className="grid relative" name="name">
              <div className="flex items-baseline justify-between relative ">
                <Form.Label
                  className={`pb-2 ${!darkMode && "text-mediumGrey"}`}
                >
                  {"title"}
                </Form.Label>
                <Form.Message
                  className="text-red text-500 pr-2 absolute top-[40px] left-[70%]"
                  match="valueMissing"
                >
                  Can`t be empty
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className={`text-500 placeholder:text-black
            FormLabel placeholder:opacity-25 px-4 py-2 rounded border-[1px] mb-6 
             border-[rgba(130,_143,_163,_0.25)] ${
               darkMode
                 ? "text-white bg-[#2B2C37] placeholder:text-white"
                 : "text-black placeholder:text-black"
             }`}
                  type="text"
                  required
                  placeholder={"placeholder"}
                />
              </Form.Control>
            </Form.Field>
          </Form.Root>

          <button type="submit">SUBMIT </button>

          <Dialog.Description>
            <h3 className="text-400 pb-2">Boards Columns</h3>
            <AddElementInput darkMode={darkMode} />
            <AddElementInput darkMode={darkMode} />
          </Dialog.Description>
          <ButtonSecondary
            darkMode={darkMode}
            buttonLabel="+ Add New Column"
            cssClasses="mb-6"
          />

          <Dialog.Close asChild>
            <ButtonPrimarySmall
              buttonLabel="Create New Board"
              buttonAction={() => {}}
            />
          </Dialog.Close>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
export default AddBoardModal;
