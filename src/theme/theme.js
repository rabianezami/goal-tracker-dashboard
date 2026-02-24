
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode, direction) => {
  return createTheme({
    direction,

    palette: {
      mode,
      primary: {
        main: "#1976d2"
      },
      background: {
        default: mode === "light" ? "#f6f7fb" : "#0b1220",
        Paper: mode === "light" ? "#ffffff" : "#0f172a",
      },
    },

    shape: { borderRadius: 12 },
    spacing: 8,

    typography: {
      fontFamily: direction === "rtl" ? "Vazirmatn, sans-serif" : ["Inter", "system-ui", "Arial", "sans-serif"].join(","),
    },

    components: {
      MuiButton: {
        styleOverrides: { root: { borderRadius: 12 } },
      },
      MuiPaper: {
        styleOverrides: { root: { borderRadius: 12 } },
      },
      MuiCard: {
        styleOverrides: { root: { borderRedius: 12 } },
      },
      MuiSvgIcon: {
        styleOverrides: { root: { color: mode === "light" ? "#1976d2" : "#90caf9", }}
      }
    },
  });
};