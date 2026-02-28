
import { createTheme } from "@mui/material/styles"

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
        paper: mode === "light" ? "#ffffff" : "#0f172a",
      }
    },
    
    shape: { borderRadius: 12 },
    spacing: 8,

    typography: {
      fontFamily: 
        direction === "rtl"
         ? "Vazirmatn, sans-serif" 
         : ["Inter", "system-ui", "Arial", "sans-serif"].join(","),

         h5: {
          fontWeight: 700,
         },

         body2: {
          fontSize: "0.87rem"
         }
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: { 
            borderRadius: 12 
          },
          contained: {
            fontSize: "1.3rem",
            fontWeight: 500,
          } 
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12 
          }, 
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12 
          }, 
        },
      },
    },
  })
}