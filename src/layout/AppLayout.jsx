import {
  Box,
  Container,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import { Outlet } from "react-router-dom"
import { useState } from "react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const drawerWidth = 220;

export default function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar onMenuClick={() => setMobileOpen(true)} />

      <Sidebar
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: `${drawerWidth}px` }, 
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}