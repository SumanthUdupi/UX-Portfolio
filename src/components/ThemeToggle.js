import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SunIcon = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0, rotate: -90 }}
    animate={{ scale: 1, rotate: 0 }}
    exit={{ scale: 0, rotate: 90 }}
    transition={{ duration: 0.3 }}
  >
    <path
      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 1V3"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21V23"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.21973 4.21973L5.63973 5.63973"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3604 18.3604L19.7804 19.7804"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 12H3"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12H23"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.21973 19.7804L5.63973 18.3604"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3604 5.63973L19.7804 4.21973"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

const MoonIcon = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0, rotate: 90 }}
    animate={{ scale: 1, rotate: 0 }}
    exit={{ scale: 0, rotate: -90 }}
    transition={{ duration: 0.3 }}
  >
    <path
      d="M21 12.79C21 17.05 17.05 21 12.79 21C10.24 21 7.9 20.01 6.24 18.35C4.33 16.44 3.5 13.88 3.5 11C3.5 6.58 7.08 3 11.5 3C12.32 3 13.12 3.12 13.88 3.34C13.5 4.89 13.79 6.5 14.68 7.9C15.91 9.77 18.06 10.89 20.32 10.89C20.59 10.89 20.85 10.87 21.11 10.84"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button onClick={toggleTheme} className="focus:outline-none">
      <AnimatePresence mode="wait">
        {isDarkMode ? <MoonIcon key="moon" /> : <SunIcon key="sun" />}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
