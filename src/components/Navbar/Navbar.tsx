"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRecoilState } from "recoil";
import logoDark from "../../../public/logo-dark.svg";
import logoLight from "../../../public/logo-light.svg";
import logoMobile from "../../../public/logo-mobile.svg";
import { boardMobileModalState } from "../../atoms/boardsMobileModalAtom";
import { modalState } from "../../atoms/modalAtom";
import { boardsState } from "../../atoms/boardsAtom";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import ButtonPrimarySmall from "../Layout/Input/Button/ButtonPrimarySmall";
import AllBoardsMobileModal from "../Modal/AllBoardsMobileModal";
import Sidebar from "../Sidebar/Sidebar";
import BoardDropDownMenu from "./BoardDropDownMenu";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [windowWidth, setWindowWidth] = useState<number>(800);
  const [activeLogo, setActiveLogo] = useState(logoLight);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [boardState, setBoardState] = useRecoilState(boardsState);
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
  const [boardMobileModalStates, setBoardMobileModalStates] = useRecoilState(
    boardMobileModalState
  );
  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  useEffect(() => {
    if (windowWidth < 768) {
      setActiveLogo(logoMobile);
      setSettingState((prev) => ({ ...prev, isSidebarOpen: false }));
    } else {
      setBoardMobileModalStates({ open: false });

      settingState.darkMode
        ? setActiveLogo(logoLight)
        : setActiveLogo(logoDark);
    }
  }, [
    setBoardMobileModalStates,
    setSettingState,
    settingState.darkMode,
    windowWidth,
  ]);
  useEffect(() => {
    if (
      !boardState.filter((board) => board.name === settingState.activeBoard)[0]
        ?.columns?.length
    ) {
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);
  }, [boardState, settingState.activeBoard]);

  return (
    <div
      className={`flex items-center relative p-4 sm:p-0 sm:py-0   ${
        settingState.darkMode ? "bg-darkGrey" : "bg-white"
      }`}
    >
      <div className="sm:w-[clamp(261px,_23vw,_300px)]">
        <Image
          src={activeLogo}
          alt="KanbanLogo"
          className="mr-4 sm:ml-6 lg:ml-8"
        ></Image>
        <Sidebar />
      </div>
      <span
        className={`hidden sm:inline-block w-[1px] h-[clamp(64.75px,_10vw,_97px)] mr-4  ${
          settingState.darkMode ? "bg-linesDark" : "bg-linesLight"
        }`}
      ></span>
      <h1
        className={` mr-2 text-900-mobile sm:mr-auto ${
          !settingState.darkMode ? "text-black" : "text-white"
        }`}
      >
        Platform Launch
      </h1>
      <MdKeyboardArrowDown
        className={`text-purple mr-auto sm:hidden cursor-pointer ${
          boardMobileModalStates.open && "rotate-180"
        }
          duration-[200ms]
          rotate-0 will-change-transform`}
        onClick={() =>
          setBoardMobileModalStates({
            open: !boardMobileModalStates.open,
          })
        }
      />
      <AllBoardsMobileModal darkMode={settingState.darkMode} />
      <div className="w-[48px] sm:w-[193px]">
        <ButtonPrimarySmall
          buttonLabel={windowWidth >= 768 ? "+ Add New Task" : "+"}
          buttonAction={() =>
            setModalsState({
              view: "addTask",
              open: true,
            })
          }
          isDisabled={isDisabled}
        />
      </div>
      <div className="ml-4 sm:mr-6 lg:mr-8 relative">
        <BoardDropDownMenu />
      </div>
    </div>
  );
};
export default Navbar;
