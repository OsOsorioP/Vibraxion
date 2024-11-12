import React, { Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesAll } from "../util/routers/RoutesAll";
import { IconButton, ThemeProvider, createTheme, useColorScheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";


const dark = createTheme({
    cssVariables: {
        colorSchemeSelector: '.demo-disable-transition-%s',
    },
    colorSchemes: { dark: true },
});
const light = createTheme({
    cssVariables: {
        colorSchemeSelector: '.demo-disable-transition-%s',
    },
    colorSchemes: { light: true },
});
function App() {
    const [mode, setMode] = useState(light);
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div className="loader center"></div>}>
                    <ThemeProvider theme={mode} disableNestedContext>
                        <IconButton onClick={() => mode === dark ? setMode(light) : setMode(dark)}>
                            {mode === dark ? <DarkMode /> : <LightMode />}
                        </IconButton>
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