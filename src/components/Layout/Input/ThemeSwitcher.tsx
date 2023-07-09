import * as Switch from "@radix-ui/react-switch";
import React from "react";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { settingsModalState } from "../../../atoms/settingsModalAtom";
import { auth, firestore } from "@/src/firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

type ThemeSwitcherProps = {};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = () => {
  const [settingState, setSettingState] = useRecoilState(settingsModalState);
  const darkMode = settingState.darkMode;
  const [user] = useAuthState(auth);
  const toggleDarkMode = async (checked: boolean) => {
    setSettingState((prev) => ({ ...prev, darkMode: checked }));
    if (user) {
      const boardRef = doc(firestore, `users/${user?.uid}`);
      await updateDoc(boardRef, {
        isDarkMode: checked,
      });
    }
  };
  return (
    // <div
    //   className={`flex items-center gap-x-6 bg-veryDarkGrey sm:mt-auto
    // rounded-md py-[.875rem] justify-center my-4 mx-4 ${
    //   darkMode ? "bg-purple" : "bg-white"
    // }`}
    // >
    //   {" "}
    //   <label className="sr-only" htmlFor="theme-switcher">
    //     Theme Switcher
    //   </label>{" "}
    //   <BsFillSunFill className="text-mediumGrey" />
    //   <Switch.Root
    //     checked={settingState.darkMode}
    //     className={`w-[40px] h-[20px] bg-purple rounded-xl`}
    //     onCheckedChange={(checked) => toggleDarkMode(checked)}
    //     id="theme-switcher"
    //   >
    //     <Switch.Thumb
    //       className="block w-[14px] h-[14px] bg-white rounded-full
    //     transition-transform duration-100
    //     translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[23px]"
    //     >
    //       <h1>aaaa</h1>
    //       <p className="">Theme Switcher</p>
    //     </Switch.Thumb>
    //   </Switch.Root>
    //   <BsMoonStarsFill className="text-mediumGrey" />{" "}

    // </div>

    <form>
      <div
        className="flex items-center"
        style={{ display: "flex", alignItems: "center" }}
      >
        <label
          className="text-white text-[15px] leading-none pr-[15px]"
          htmlFor="airplane-mode"
        >
          Airplane mode
        </label>
        <Switch.Root
          className="w-[42px] h-[25px] bg-blackA9 rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
          id="airplane-mode"
        >
          <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
      </div>
    </form>
  );
};
export default ThemeSwitcher;
