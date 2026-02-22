import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";

export default function AppLayout(){
  return(
    <div className="app-layout">
      
      <Navbar/>

      <div className="content-layout">
        <SideBar/>
        <div className="page-content">
          <Outlet/>
        </div>
      </div>

    </div>
  )
}