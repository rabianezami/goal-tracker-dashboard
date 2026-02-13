// src/providers/AppThemeProvider.jsx
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { getTheme } from "../theme/theme";
import { cacheRtl, cacheLtr } from "../theme/cache";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function AppThemeProvider({ children, mode }) {
  const { i18n } = useTranslation()
  const direction = i18n.language === "fa" ? "rtl" : "ltr"

  const theme = getTheme(mode, direction)
  const cache = direction === "rtl" ? cacheRtl : cacheLtr

  useEffect(() => {
    document.documentElement.dir = direction
    document.body.dir = direction
  }, [direction])

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  )
}
