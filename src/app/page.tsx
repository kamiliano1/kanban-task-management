"use client";
import Image from "next/image";
import RegisterModal from "../components/Modal/RegisterModal";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
// import { settingsModalState } from "../atoms/settingsModalAtom";
import { useRecoilState } from "recoil";
import ButtonPrimaryBoards from "../components/Layout/Input/Button/ButtonPrimaryBoards";
import SidebarOpenButton from "../components/Sidebar/SidebarOpenButton";
import Board from "../components/Board/Board";

export default function Home() {
  // const [settingState, setSettingState] = useRecoilState(settingsModalState);
  return (
    <main className="">
      {/* <RegisterModal /> */}
      <Navbar />
      <Modal />
      <SidebarOpenButton />
      <Board />
    </main>
  );
}
