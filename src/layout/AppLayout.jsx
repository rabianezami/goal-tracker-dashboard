import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useState } from "react"

// import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* <Navbar onMenuClick={handleDrawerToggle} /> */}

      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={handleDrawerToggle}
        />

        <Box
          component="main"
          sx={{ flex: 1, py: 3 }}
        >
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  )
}