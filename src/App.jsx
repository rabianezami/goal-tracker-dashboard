import { useState} from "react"
import AppThemeProvider from "./providers/AppThemeProvider"
import AppRoutes from "./routes/AppRoutes"
import "./i18n"

function App() {

  // we can add this logic of dark mode and language to context/settingsContext because these are globle and shoud be in a context

  const saveMode = localStorage.getItem("appMode") || "light"
  
  const [mode, setMode] = useState(saveMode)

  const toggleMode = () => {
    setMode(prev => {
      const newMode = prev === "light" ? "dark" : "light"
      localStorage.setItem("appMode", newMode)
      return newMode
    })
  }

  const toggleLanguage = () => {
  const newLang = i18n.language === "fa" ? "en" : "fa"
  i18n.changeLanguage(newLang)
  localStorage.setItem("appLanguage", newLang)
  }

  return (
    <>
     <AppThemeProvider mode={mode}>
        <AppRoutes />
     </AppThemeProvider>
    </>
  )
}

export default App
