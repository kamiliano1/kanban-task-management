import React from "react";
import { modalState } from "@/src/atoms/modalAtom";
import { FaUser } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";
type LogoutButtonProps = {};

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const darkMode = settingState.darkMode;
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div
      onClick={logout}
      className={`text-mediumGrey py-3 cursor-pointer flex items-center gap-x-4 sm:px-6
  lg:pl-8 rounded-[0px_100px_100px_0px] hover:text-purple ${
    darkMode ? "sm:hover:bg-white" : "sm:hover:bg-purple sm:hover:bg-opacity-10"
  } `}
    >
      <FaUser />
      <p>Logout</p>
    </div>
  );
};
export default LogoutButton;
