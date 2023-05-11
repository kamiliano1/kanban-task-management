"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Checkbox from "../Layout/Input/Checkbox";
import TextField from "../Layout/Input/TextField";
import TextArea from "../Layout/Input/TextArea";
import DropMenu from "../Layout/Input/DropMenu";
import ButtonPrimaryLarge from "../Layout/Input/Button/ButtonPrimaryLarge";
import ButtonPrimarySmall from "../Layout/Input/Button/ButtonPrimarySmall";
import ButtonSecondary from "../Layout/Input/Button/ButtonSecondary";
import ButtonDestructive from "../Layout/Input/Button/ButtonDestructive";
import ThemeSwitcher from "../Layout/Input/ThemeSwitcher";
import ViewTaskModal from "../Modal/ViewTaskModal";
import logoMobile from "../../../public/logo-mobile.svg";
import logoDark from "../../../public/logo-dark.svg";
import logoLight from "../../../public/logo-light.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import AllBoardsMobileModal from "../Modal/AllBoardsMobileModal";
import { modalState } from "../../atoms/modalAtom";
import { settingsState } from "../../atoms/settingsModal";
import { useRecoilState, useRecoilValue } from "recoil";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [activeLogo, setActiveLogo] = useState(logoLight);
  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const [darkMode, setDarMode] = useState<boolean>(true);
  const [boardState, setBoardState] = useRecoilState(modalState);
  const settingState = useRecoilValue(settingsState);
  useEffect(() => {
    if (windowWidth < 768) {
      setActiveLogo(logoMobile);
    } else {
      settingState.darkMode
        ? setActiveLogo(logoLight)
        : setActiveLogo(logoDark);
    }
  }, [settingState.darkMode, windowWidth]);
  return (
    <div
      className={`flex items-center relative p-4 sm:px-6 sm:py-0  ${
        settingState.darkMode ? "bg-darkGrey" : "bg-white"
      }`}
    >
      <Image src={activeLogo} alt="KanbanLogo" className="mr-4"></Image>
      <span
        className={`hidden sm:inline-block w-[1px] h-[80px] mr-4  ${
          settingState.darkMode ? "bg-linesDark" : "bg-linesLight"
        }`}
      ></span>
      <h1
        className={`mr-2 text-900-mobile ${
          !settingState.darkMode && "text-black"
        }`}
      >
        Platform Launch
      </h1>

      <MdKeyboardArrowDown className="text-purple mr-auto" />
      {/* <AllBoardsMobileModal /> */}

      <ButtonPrimarySmall
        buttonLabel={windowWidth > 768 ? "+ Add New Task" : "+"}
      />
      <BiDotsVerticalRounded className="text-mediumGrey ml-4" />
    </div>
  );
};
export default Navbar;
