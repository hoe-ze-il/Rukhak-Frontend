import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  palette: {
    primary: {
      main: "#256c2c",
      light: "#a9f5a4",
      dark: "#256c2c",
    },
    secondary: {
      main: "#d5e8cf",
      light: "#d5e8cf",
      dark: "#52634f",
    },
    text: {
      primary: "#454743",
      secondary: "#5d5f5a",
    },
    background: {
      paper: "#fff",
      default: "#f5f7f8",
    },
    error: {
      main: "#ba1a1a",
      light: "#ffb4ab",
      dark: "#93000a",
    },
  },
});

export default theme;
