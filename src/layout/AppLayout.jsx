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
      
      {/* Navbar */}
      <Navbar onMenuClick={handleDrawerToggle} />

      {/* Content Row */}
      <Box sx={{ display: "flex", flex: 1 }}>
        
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={handleDrawerToggle}
        />

        {/* Main */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Container maxWidth="lg">
            <Outlet />
          </Container>
        </Box>

      </Box>
    </Box>
  )
}