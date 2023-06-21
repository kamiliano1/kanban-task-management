import React from "react";
import { FaEye } from "react-icons/fa";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { useRecoilState } from "recoil";
import { auth, firestore } from "@/src/firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

type SidebarOpenButtonProps = {};

const SidebarOpenButton: React.FC<SidebarOpenButtonProps> = () => {
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [user] = useAuthState(auth);
  const toggleSidebar = async () => {
    setSettingState((prev) => ({
      ...prev,
      isSidebarOpen: !settingState.isSidebarOpen,
    }));
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        isSidebarOpen: !settingState.isSidebarOpen,
      });
    }
  };

  return (
    <button
      className={`hidden bg-purple text-white sm:flex items-center py-3 px-5 bottom-[calc(0px_+_32px)] rounded-[0px_100px_100px_0px] text-700
     hover:bg-lightPurple disabled:opacity-25 fixed`}
      onClick={toggleSidebar}
    >
      <span className="sr-only">Eye Icon</span>
      <FaEye />
    </button>
  );
};
export default SidebarOpenButton;
