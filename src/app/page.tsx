"use client";
import Image from "next/image";
import RegisterModal from "../components/Modal/Account/RegisterModal";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
// import { settingsModalState } from "../atoms/settingsModalAtom";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import ButtonPrimaryBoards from "../components/Layout/Input/Button/ButtonPrimaryBoards";
import SidebarOpenButton from "../components/Sidebar/SidebarOpenButton";
import Board from "../components/Board/Board";
import { settingsModalState } from "../atoms/settingsModalAtom";

export default function Home() {
  // const settingState = useRecoilValue(settingsModalState);
  // const darkMode = settingState.darkMode;
  return (
    <main className=" bg-black">
      <RecoilRoot>
        <Navbar />
        <Modal />
        <SidebarOpenButton />
        <Board />
      </RecoilRoot>
    </main>
  );
}
