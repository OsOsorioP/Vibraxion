import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesAll } from "./util/routers/RoutesAll";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from '@mui/material/styles';
import { orange, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className="loader center"></div>}>
          <ThemeProvider theme={theme}>
            <RoutesAll />
          </ThemeProvider>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
