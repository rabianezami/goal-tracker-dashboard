import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

import { Box, Divider, Paper, Stack, Switch, Typography } from "@mui/material"

export default function Settings() {
  const { mode, toggleMode } = useContext(ThemeContext)
  const isDark = mode === "dark"

  return (
    <Box
      sx={{
        display: "flex", flexGrow: 1,
        justifyContent: "center", p: 4,
        mt:10
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
            تنظیمات
          </Typography>

          <Divider />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="subtitle1">
                {isDark ? "حالت روشن" : "حالت تاریک"}
              </Typography>
            </Box>

            <Switch
              checked={isDark}
              onChange={toggleMode}
            />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}