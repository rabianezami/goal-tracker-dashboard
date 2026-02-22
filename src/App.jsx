import { useState} from "react"
import AppThemeProvider from "./providers/AppThemeProvider"
import AppRoutes from "./routes/AppRoutes"
import "./i18n/index.js"

function App() {

  return (
    <>
     <AppThemeProvider>
        <AppRoutes />
     </AppThemeProvider>
    </>
  )
}

export default App
