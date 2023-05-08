"use client";
import React, { useState } from "react";
import Checkbox from "../Layout/Input/Checkbox";
import TextField from "../Layout/Input/TextField";
import TextArea from "../Layout/Input/TextArea";
import DropMenu from "../Layout/Input/DropMenu";
import ButtonPrimaryLarge from "../Layout/Input/Button/ButtonPrimaryLarge";
import ButtonPrimarySmall from "../Layout/Input/Button/ButtonPrimarySmall";
import ButtonSecondary from "../Layout/Input/Button/ButtonSecondary";
import ButtonDestructive from "../Layout/Input/Button/ButtonDestructive";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [darkMode, setDarMode] = useState<boolean>(true);
  return (
    <div
      className={`max-w-[1440px] h-[100vh] mx-auto ${
        darkMode ? "bg-darkGrey" : "bg-white"
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
      <Checkbox darkMode={darkMode} />
      <TextField darkMode={darkMode} />
      <TextArea darkMode={darkMode} />
      <DropMenu darkMode={darkMode} />
      <ButtonPrimaryLarge />
      <ButtonPrimarySmall />
      <ButtonSecondary darkMode={darkMode} />
      <ButtonDestructive />
    </div>
  );
};
export default Navbar;
