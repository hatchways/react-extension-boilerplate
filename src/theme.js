import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#87D1C6",
      main: "#46B2A2",
      dark: "#317D72",
      contrastText: "#fff"
    },
    secondary: {
      light: "#FF9C7C",
      main: "#FD5A25",
      dark: "#BD3713",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Roboto"',
    body1: {
      color: "#484848"
    },
    body2: {
      color: "#484848"
    },
    caption: {
      color: "#484848"
    },
    subtitle1: {
      lineHeight: 1.5
    },
    button: {
      fontFamily: '"Century Gothic", sans-serif'
    }
  }
});

export default theme;
