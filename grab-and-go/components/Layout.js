import React from "react";
import Navbar from "./Navbar";
import Meta from "./Meta";
import ThemeProvider from "../styles/ThemeProvider";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { StoreProvider } from "../context";

const Layout = ({ children }) => {
  const greenTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#86c232",
        dark: "#7eb92c",
      },
      secondary: {
        main: "#2f5f2d",
        dark: "#2b5c2a",
      },
    },
  });

  return (
    <MuiThemeProvider theme={greenTheme}>
      <StoreProvider>
        <div className="light-green-bgc h-100vh">
          <Meta />
          <Navbar />
          {children}
        </div>
      </StoreProvider>
    </MuiThemeProvider>
  );
};

export default Layout;
