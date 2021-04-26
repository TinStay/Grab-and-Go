import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const ThemeProvider = (props) => {
  const theme = createMuiTheme({
    palette: {
      text: {
        primary: '#86c232',
        secondary: '#ffffff'
      },
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

  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
};

export default ThemeProvider;
