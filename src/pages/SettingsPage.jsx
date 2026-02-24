import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { LanguageContext } from "../context/LanguageContext"
import { useTranslation } from "react-i18next"
import LanguageIcon from '@mui/icons-material/Language'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { Box, Button, Divider, Paper, Stack, Switch, Typography } from "@mui/material"

export default function Settings() {
  const { t } = useTranslation("settings")

  const { mode, toggleMode } = useContext(ThemeContext)
  const { toggleLanguage } = useContext(LanguageContext)

  const isDark = mode === "dark"


  return (
    <Box
      sx={{
        display: "flex", flexGrow: 1,
        justifyContent: "center", p: 4,
        mt: 10
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600, width: "100%",
          p: 4
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5">
            {t("settings.title")}
          </Typography>

          <Divider />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
              <Typography variant="subtitle1">
                {isDark ? t("theme.light") : t("theme.dark")}
              </Typography>
            </Box>

            <Switch
              checked={isDark}
              onChange={toggleMode}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1}>
              <LanguageIcon />
              <Typography>
                {t("language.current")}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={toggleLanguage}
              sx={{ textTransform: "none"}}
            >
              {t("language.change")}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}