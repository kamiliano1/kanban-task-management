import { modalState } from "@/src/atoms/modalAtom";
import { settingsModalState } from "@/src/atoms/settingsModalAtom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRecoilState, useRecoilValue } from "recoil";
type TaskDropDownMenuProps = {};
const TaskDropDownMenu: React.FC<TaskDropDownMenuProps> = () => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const settingState = useRecoilValue(settingsModalState);
  const darkMode = settingState.darkMode;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="cursor-pointer">
          <BiDotsVerticalRounded className={`text-mediumGrey`} />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={` flex text-mediumGrey z-[300] mx-6 mt-[2rem]
      flex-col w-[192px] p-4 gap-4 space-y-2 rounded-lg ${
        darkMode ? "bg-veryDarkGrey " : "bg-white "
      } `}
        >
          <DropdownMenu.Item
            className="hover:outline-none cursor-pointer hover:opacity-70"
            onClick={() => {
              setModalsState({ open: true, view: "editTask" });
            }}
          >
            Edit Task
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="hover:outline-none cursor-pointer hover:opacity-70 text-red"
            onClick={() => {
              setModalsState({ open: true, view: "deleteTask" });
            }}
          >
            Delete Task
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
export default TaskDropDownMenu;
