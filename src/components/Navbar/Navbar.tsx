"use client";
import React, { useState } from "react";
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
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [darkMode, setDarMode] = useState<boolean>(true);
  return (
    <div
      className={`max-w-[1440px] h-[100vh] relative  mx-auto ${
        darkMode ? "bg-veryDarkGrey" : "bg-white"
      }`}
    >
      <button
        onClick={() => {
          setDarMode((prev) => !prev);
        }}
      >
        Zmiana
      </button>
      <h2 className="p-4">{darkMode ? "Ciemny" : "Jasny"}</h2>
      <Checkbox darkMode={darkMode} checkboxLabel="aaa" />
      {/* 
      <TextField darkMode={darkMode} />
      <TextArea darkMode={darkMode} />
      <DropMenu darkMode={darkMode} />
      <ButtonPrimaryLarge />
      <ButtonPrimarySmall />
      <ButtonSecondary darkMode={darkMode} />
      <ButtonDestructive />
      <ThemeSwitcher darkMode={darkMode} /> */}
      <ViewTaskModal darkMode={darkMode} />
      <div
        className={`flex items-center relative p-4 ${
          darkMode ? "bg-darkGrey" : "bg-white"
        }`}
      >
        <Image src={logoMobile} alt="KanbanLogo" className="mr-4"></Image>
        <h1 className={`mr-2 text-900-mobile ${!darkMode && "text-black"}`}>
          Platform Launch
        </h1>
        <MdKeyboardArrowDown className="text-purple mr-auto" />
        <ButtonPrimarySmall buttonLabel="+" />
        <BiDotsVerticalRounded className="text-mediumGrey ml-4" />
      </div>
      <div className="absolute bg-lightPurple">
        <AllBoardsMobileModal />
      </div>
    </div>
  );
};
export default Navbar;
