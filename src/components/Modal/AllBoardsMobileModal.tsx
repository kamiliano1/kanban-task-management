import { boardsState } from "@/src/atoms/boardsAtom";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import ButtonAddBoard from "../Layout/Button/ButtonAddBoard";
import ButtonPrimaryBoards from "../Layout/Button/ButtonPrimaryBoards";
import ThemeSwitcher from "../Layout/Input/ThemeSwitcher";
import LoginButton from "../Sidebar/LoginButton";
import LogoutButton from "../Sidebar/LogoutButton";
import { auth, firestore } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
type AllBoardsMobileModalProps = { darkMode: boolean };
const AllBoardsMobileModal: React.FC<AllBoardsMobileModalProps> = ({
  darkMode,
}) => {
  const [boardState, setBoardState] = useRecoilState(boardsState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getUserData = async () => {
      const userDataRef = doc(firestore, "users", user!.uid);
      const userData = await getDoc(userDataRef);
      const bookmarkData = userData.data();
      setSettingState((prev) => ({
        ...prev,
        activeBoard: bookmarkData?.activeBoard,
      }));
    };
    if (loading && boardState.length) {
      if (user) {
        getUserData();
        return;
      }
      setSettingState((prev) => ({
        ...prev,
        activeBoard: boardState[0].name,
      }));
      setLoading(false);
    }
  }, [boardState, loading, setSettingState, user]);
  const boardList = boardState.map((item) => (
    <ButtonPrimaryBoards key={item.id} buttonLabel={item.name} />
  ));
  return (
    <Dialog.Root
      open={settingState.isBoardModalListOpen}
      onOpenChange={() =>
        setSettingState((prev) => ({
          ...prev,
          isBoardModalListOpen: !settingState.isBoardModalListOpen,
        }))
      }
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />
        <Dialog.Content
          className={`${
            darkMode ? "bg-darkGrey" : "bg-white"
          } data-[state=open]:animate-boardMobileShow fixed top-[70px] left-[50%] max-h-[85vh] w-[90vw]
        translate-x-[-50%] data-[state=closed]:animate-boardMobileHidden
        max-w-[264px] 
          rounded-[6px]
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
         focus:outline-none`}
        >
          <div className="flex flex-col pr-6">
            <Dialog.Title className="text-mediumGrey text-400 tracking-[2.4px] px-6 py-4">
              ALL BOARDS ({boardState.length})
            </Dialog.Title>
            {boardList}
            <ButtonAddBoard />
          </div>
          <ThemeSwitcher />
          <div className="px-5 mb-3">
            {user ? <LogoutButton /> : <LoginButton />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default AllBoardsMobileModal;
