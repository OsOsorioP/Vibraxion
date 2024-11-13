import React, { Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesAll } from "../util/routers/RoutesAll";
import { IconButton, ThemeProvider, createTheme, useColorScheme, Grid2 } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";


const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: '.demo-disable-transition-%s',
    },
    colorSchemes: {dark: true },
});

function ModeSwitcher() {
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

function App() {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div className="loader center"></div>}>
                    <ThemeProvider theme={theme} defaultMode="light">
                        <Grid2 container spacing={1}>
                            <Grid2 item size={{ xs: 12 }} align="center">
                                <ModeSwitcher />
                            </Grid2>
                        </Grid2>
                        <div className="center">
                            <RoutesAll />
                        </div>
                    </ThemeProvider>
                </Suspense>
            </BrowserRouter>
        </>
    );

}

export default App