"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRecoilState } from "recoil";
import logoDark from "../../../public/logo-dark.svg";
import logoLight from "../../../public/logo-light.svg";
import logoMobile from "../../../public/logo-mobile.svg";
import { modalState } from "../../atoms/modalAtom";
import { boardsState } from "../../atoms/boardsAtom";
import { settingsModalState } from "../../atoms/settingsModalAtom";
import ButtonPrimarySmall from "../Layout/Button/ButtonPrimarySmall";
import AllBoardsMobileModal from "../Modal/AllBoardsMobileModal";
import Sidebar from "../Sidebar/Sidebar";
import BoardDropDownMenu from "./BoardDropDownMenu";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [windowWidth, setWindowWidth] = useState<number>(200);
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

  const [modalsState, setModalsState] = useRecoilState(modalState);
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const isPageLoaded = settingState.isLoaded;
  useEffect(() => {
    if (windowWidth < 768) {
      setActiveLogo(logoMobile);
      setSettingState((prev) => ({ ...prev, isSidebarOpen: false }));
    } else {
      setSettingState((prev) => ({ ...prev, isBoardModalListOpen: false }));

      settingState.darkMode
        ? setActiveLogo(logoLight)
        : setActiveLogo(logoDark);
    }
  }, [setSettingState, settingState.darkMode, windowWidth]);
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
      {" "}
      {!isPageLoaded && (
        <div className="mx-3 ml-6 w-full py-2 h-[clamp(64.75px,_10vw,_97px)] items-center flex">
          <SkeletonTheme
            baseColor={settingState.darkMode ? "hsl(235 12% 19%)" : "grey"}
            highlightColor={settingState.darkMode ? "#444" : "white"}
          >
            <Skeleton height={25} containerClassName="flex-1" />
          </SkeletonTheme>
        </div>
      )}
      <div className="sm:w-[clamp(261px,_23vw,_300px)]">
        {isPageLoaded && (
          <Image
            src={activeLogo}
            alt="KanbanLogo"
            className="mr-4 sm:ml-6 lg:ml-8"
            loading="eager"
          ></Image>
        )}
        <Sidebar />
      </div>
      {isPageLoaded && (
        <>
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
              settingState.isBoardModalListOpen && "rotate-180"
            }
          duration-[200ms]
          rotate-0 will-change-transform`}
            onClick={() =>
              setSettingState((prev) => ({
                ...prev,
                isBoardModalListOpen: !settingState.isBoardModalListOpen,
              }))
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
        </>
      )}
    </div>
  );
};
export default Navbar;
