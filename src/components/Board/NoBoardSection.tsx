import React from "react";
import ButtonPrimaryLarge from "../Layout/Button/ButtonPrimaryLarge";
import { useRecoilState } from "recoil";
import { modalState } from "@/src/atoms/modalAtom";

type NoBoardSectionProps = {};

const NoBoardSection: React.FC<NoBoardSectionProps> = () => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <p className="text-800 text-mediumGrey pb-6 text-center px-4">
        You don`t have any board. Create a new board to get started.
      </p>
      <ButtonPrimaryLarge
        buttonLabel="+ Create New Board"
        buttonAction={() => {
          setModalsState({ open: true, view: "addBoard" });
        }}
      />
    </div>
  );
};
export default NoBoardSection;
