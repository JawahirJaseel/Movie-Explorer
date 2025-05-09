// src/components/ThemeToggle.jsx
import React from "react";
import IconButton from "@mui/material/IconButton";
import { useColorMode } from "../theme/ThemeContext"; // Adjust path if needed
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeToggle = () => {
  const { toggleColorMode, mode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
