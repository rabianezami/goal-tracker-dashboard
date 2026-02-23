import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AppLayout(){
  return(
    <Box sx={{ display: "flex", flexDirection: "row-reverse"}}>
        <Navbar/>
        <Sidebar/>
         <Box component="main">
          <Outlet/>
         </Box>
    </Box>
   
  )
}