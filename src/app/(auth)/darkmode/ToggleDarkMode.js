import React, { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa6";
import { TbMoon } from "react-icons/tb";

const ToggleDarkMode = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);

    document.documentElement.style.setProperty(
      "--text-color",
      darkMode ? "#fff" : "#000"
    );

    document.documentElement.style.setProperty(
      "--toastshadow",
      darkMode
        ? "6px 6px 12px #120d0d,-6px -6px 12px #463535"
        : "inset 5px 5px 10px #5e5656,inset -5px -5px 10px #ffffff"
    );
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className={`min-h-[50px] px-4 w-full rounded-xl text-white font-bold shadow-lightmode active:shadow-lightmodeclick  dark:shadow-customshadow dark:active:shadow-buttonclick `}
      >
        {darkMode ? <TbMoon /> : <FaSun />}
      </button>
    </>
  );
};

export default ToggleDarkMode;
