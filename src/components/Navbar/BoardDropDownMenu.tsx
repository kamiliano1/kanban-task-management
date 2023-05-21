import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "@/src/atoms/modalAtom";
type BoardDropDownMenuProps = {};

const BoardDropDownMenu: React.FC<BoardDropDownMenuProps> = () => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const darkMode = true;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="cursor-pointer">
          <BiDotsVerticalRounded className="text-mediumGrey" />
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
              setModalsState({ open: true, view: "editBoard" });
            }}
          >
            Edit Board
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="hover:outline-none cursor-pointer hover:opacity-70 text-red"
            onClick={() => {
              setModalsState({ open: true, view: "deleteBoard" });
            }}
          >
            Delete Board
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
export default BoardDropDownMenu;
