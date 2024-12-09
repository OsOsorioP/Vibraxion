import React from "react";
import { IconButton, ThemeProvider, createTheme, useColorScheme, Grid2 } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: '.demo-disable-transition-%s',
    },
    colorSchemes: {dark: true },
});

export function ModeSwitcher() {
    const { mode, setMode } = useColorScheme();
    console.log(mode)
    console.log(setMode)
    if (!mode) {
        return null;
    }
    return (

        <IconButton sx={{ borderRadius: '4px', transition: '1s',m: 3 }} value={mode} onClick={() => mode === "dark" ? setMode("light") : setMode("dark")}>
            {mode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
    );
}