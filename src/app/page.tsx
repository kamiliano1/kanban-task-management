"use client";
import Image from "next/image";
import RegisterModal from "../components/Modal/RegisterModal";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
import { settingsState } from "../atoms/settingsModal";
import { useRecoilState } from "recoil";

export default function Home() {
  const [settingState, setSettingState] = useRecoilState(settingsState);
  return (
    <main className="">
      {/* <RegisterModal /> */}
      <Navbar />
      <Modal darkMode={settingState.darkMode} />
    </main>
  );
}
