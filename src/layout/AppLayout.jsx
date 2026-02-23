import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
export default function AppLayout(){
  return(
    <div>
      <Navbar progress={"0%"}></Navbar>
      <main>
          <Outlet/>
      </main>
    </div>
      
  )
}