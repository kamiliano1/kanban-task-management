import { modalState } from "@/src/atoms/modalAtom";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsModalState } from "../../atoms/settingsModalAtom";
type LoginButtonProps = {};

const LoginButton: React.FC<LoginButtonProps> = () => {
  const settingState = useRecoilValue(settingsModalState);
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const darkMode = settingState.darkMode;

  return (
    <div
      onClick={() =>
        setModalsState({
          view: "login",
          open: true,
        })
      }
      className={`text-mediumGrey py-3 cursor-pointer flex items-center gap-x-4 sm:px-6
    lg:pl-8 rounded-[0px_100px_100px_0px] hover:text-purple ${
      darkMode
        ? "sm:hover:bg-white"
        : "sm:hover:bg-purple sm:hover:bg-opacity-10"
    } `}
    >
      <AiOutlineUser />
      <p>Login</p>
    </div>
  );
};
export default LoginButton;
