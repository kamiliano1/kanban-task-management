import React from "react";
import ButtonPrimaryLarge from "../Layout/Input/Button/ButtonPrimaryLarge";
import { useRecoilState } from "recoil";
import { modalState } from "@/src/atoms/modalAtom";
type NoColumnSectionProps = {};

const NoColumnSection: React.FC<NoColumnSectionProps> = () => {
  const [modalsState, setModalsState] = useRecoilState(modalState);
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-800 text-mediumGrey pb-6 text-center px-4">
        This board is empty. Create a new column to get started.
      </p>
      <ButtonPrimaryLarge
        buttonLabel="+ Add New Column"
        buttonAction={() => {
          setModalsState({ open: true, view: "editBoard" });
        }}
      />
    </div>
  );
};
export default NoColumnSection;
