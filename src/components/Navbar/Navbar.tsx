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
import { settingsModalState } from "../../atoms/settingsModalAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { nanoid } from "nanoid";
import { boardMobileModalState } from "../../atoms/boardsMobileModalAtom";
import Sidebar from "../Sidebar/Sidebar";
import BoardDropDownMenu from "./BoardDropDownMenu";
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
  const [boardMobileModalStates, setBoardMobileModalStates] = useRecoilState(
    boardMobileModalState
  );
  const [staraData, setStaraData] = useState([""]);
  const [ladowanieDanych, setLdowanieDanych] = useState([""]);
  const [darkMode, setDarMode] = useState<boolean>(true);
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

  const fetchData = () => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => {
        // setStaraData(data.boards);
        // console.log(staraData);
        // setStaraData((prev) => {
        //   prev.map((item) => {
        //     // console.log(item.columns);
        //     item.columns.map((col) => {
        //       // console.log(col);
        //       // console.log(col.tasks);
        //       col.tasks.map((taski) => {
        //         // console.log(taski);
        //         taski.subtasks.map((suby) => {
        //           // console.log(suby);
        //           const kk = { ...suby, id: nanoid() };
        //           // console.log(kk);
        //         });
        //       });
        //     });
        //   });
        //   // return prev.map((board) => ({ ...board, id: nanoid() }));
        //   // return prev.map((board) => {
        //   //   const columns = board.columns;
        //   //   columns.map(task=>{
        //   //   })
        //   //   return { ...board, columns: columns, id: nanoid() };
        //   // });
        // });
      });
    // console.log(staraData);
  };

  return (
    <div>
      <div
        className={`flex items-center relative p-4 sm:p-0 sm:py-0  ${
          settingState.darkMode ? "bg-darkGrey" : "bg-white"
        }`}
      >
        <div className="sm:w-[clamp(261px,_23vw,_300px)] ">
          <Image
            src={activeLogo}
            alt="KanbanLogo"
            className="mr-4 sm:ml-6 lg:ml-8"
          ></Image>
        </div>
        <Sidebar />
        <span
          className={`hidden sm:inline-block w-[1px] h-[clamp(81px,_18vw,_97px)] mr-4  ${
            settingState.darkMode ? "bg-linesDark" : "bg-linesLight"
          }`}
        ></span>
        <h1
          className={` mr-2 text-900-mobile sm:mr-auto ${
            !settingState.darkMode && "text-black"
          }`}
        >
          Platform Launch
        </h1>
        <button
          onClick={() =>
            setModalsState({
              view: "viewTask",
              open: !modalsState.open,
            })
          }
        >
          Open
        </button>
        <button
          className="p-5 bg-lightPurple"
          onClick={() =>
            setSettingState((prev) => ({
              ...prev,
              isSidebarOpen: !settingState.isSidebarOpen,
            }))
          }
        >
          SideBar
        </button>
        {/* <button onClick={fetchData}>Data</button>
        <button onClick={aktualizaDanych}>Daner</button> */}
        <MdKeyboardArrowDown
          className={`text-purple mr-auto sm:hidden ${
            !boardMobileModalStates.open && "rotate-180"
          }
          
          duration-[200ms]
          rotate-0 will-change-transform`}
          onClick={() =>
            setBoardMobileModalStates({
              open: !boardMobileModalStates.open,
            })
          }
        />
        <AllBoardsMobileModal darkMode={darkMode} />

        <ButtonPrimarySmall
          buttonLabel={windowWidth > 768 ? "+ Add New Task" : "+"}
          buttonAction={() => console.log("klicked")}
        />
        <div className="ml-4 sm:mr-6 lg:mr-8 relative">
          {/* <BiDotsVerticalRounded className="text-mediumGrey" /> */}

          <BoardDropDownMenu />
        </div>
      </div>
      {/* <div className="hidden sm:block fixed h-[100vh] bg-darkGrey w-[193px] border-r-[1px] border-[hsl(236_11%_27%)]"></div> */}
    </div>
  );
};
export default Navbar;
