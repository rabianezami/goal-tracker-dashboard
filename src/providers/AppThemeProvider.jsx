import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { CacheProvider } from "@emotion/react"
import { getTheme } from "../theme/theme"
import { cacheRtl, cacheLtr } from "../theme/cache"
import { useEffect, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { LanguageContext } from "../context/LanguageContext"
import CssBaseline from "@mui/material/CssBaseline"

export default function AppThemeProvider({ children }) {
  const { mode } = useContext(ThemeContext)
  const { language } = useContext(LanguageContext)

  const direction = language === "fa" ? "rtl" : "ltr"
  const theme = getTheme(mode, direction)
  const cache = direction === "rtl" ? cacheRtl : cacheLtr

  useEffect(() => {
    document.documentElement.dir = direction
    document.body.dir = direction
  }, [direction])

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
         <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}