import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Define the color palette
const colors = {
  primary: {
    light: "#EDE7F6",
    main: "#673AB7",
    dark: "#5E35B1",
    contrastText: "#FFFFFF",
  },
  secondary: {
    light: "#E3F2FD",
    main: "#2196F3",
    dark: "#1E88E5",
    contrastText: "#FFFFFF",
  },
  success: {
    light: "#B9F6CA",
    main: "#00E676",
    dark: "#00C853",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#F4F6F8",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#000000",
    secondary: "#757575",
  },
};

const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    background: colors.background,
    text: colors.text,
  },
  typography: {
    h1: {
      fontSize: "2.125rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "0.875rem",
    },
    body2: {
      fontSize: "0.75rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
          "&:hover": {
            backgroundColor: colors.primary.dark,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.primary.contrastText,
          color: colors.primary.contrastText,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: colors.text.primary,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: colors.text.primary,
        },
      },
    },
  },
});

// Apply responsive font sizes
const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
