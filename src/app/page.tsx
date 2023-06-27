"use client";
import Modal from "../components/Modal/Modal";
import Navbar from "../components/Navbar/Navbar";
import { RecoilRoot } from "recoil";
import Board from "../components/Board/Board";
import SidebarOpenButton from "../components/Sidebar/SidebarOpenButton";

export default function Home() {
  return (
    <main className="bg-black">
      <RecoilRoot>
        <Navbar />
        <Modal />
        <SidebarOpenButton />
        <Board />
      </RecoilRoot>
    </main>
  );
}
