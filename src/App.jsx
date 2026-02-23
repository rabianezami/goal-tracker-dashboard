import { useState} from "react"
import AppThemeProvider from "./providers/AppThemeProvider"
import AppRoutes from "./routes/AppRoutes"
import "./index.css"
import {CssBaseline} from "@mui/material";
import "./i18n/index.js"

function App() {

  return (
    <>
     <AppThemeProvider>
        <CssBaseline></CssBaseline>
        <AppRoutes />
     </AppThemeProvider>
    </>
  )
}

export default App
