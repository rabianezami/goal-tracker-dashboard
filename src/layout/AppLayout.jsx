import {
  Box,
  Container,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material"

import { Outlet } from "react-router-dom"
import { useState, useMemo } from "react"
import { useGoals } from "../context/GoalsContext"

import Navbar from "../components/common/Navbar"
import Sidebar from "../components/common/Sidebar"

const drawerWidth = 220;

export default function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false)

  const { goals } = useGoals()


  const { completedPercent, uncompletedPercent } = useMemo(() => {
    const totalGoals = goals.length
    const completedGoals = goals.filter(g => g.status === "completed").length
    const uncompletedGoals = totalGoals - completedGoals
    return {
      completedPercent: totalGoals ? Math.round((completedGoals / totalGoals) * 100) : 0,
      uncompletedPercent: totalGoals ? Math.round((uncompletedGoals / totalGoals) * 100) : 0
    }
  }, [goals]) 

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        onMenuClick={() => setMobileOpen(true)}
        completed={completedPercent}
        uncompleted={uncompletedPercent}
        user={{ name: "User" }} 
      />

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