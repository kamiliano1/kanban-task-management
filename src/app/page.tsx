"use client";
import Image from "next/image";
import RegisterModal from "../components/Modal/Account/RegisterModal";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
// import { settingsModalState } from "../atoms/settingsModalAtom";
import { RecoilRoot, useRecoilState } from "recoil";
import ButtonPrimaryBoards from "../components/Layout/Input/Button/ButtonPrimaryBoards";
import SidebarOpenButton from "../components/Sidebar/SidebarOpenButton";
import Board from "../components/Board/Board";

export default function Home() {
  return (
    <main className="">
      <RecoilRoot>
        <Navbar />
        <Modal />
        <SidebarOpenButton />
        <Board />
      </RecoilRoot>
    </main>
  );
}
