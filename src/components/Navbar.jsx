// import { Box, Typography } from '@mui/material';
import  user from "../assets/user-image.webp";

export default function Navbar({progress}) {
  return (
    <div>
      <div className="p-4 background-container shadow-lg">
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-4 bg-gray-50/60 rounded-md px-4 mx-12 shadow-md">
            <img src={user} 
              alt="user-image"
              className="w-20 h-20 shadow-md rounded-full relative right-8"
            />
            <div className="text-center mx-12">
              <p className="mx-8 font-semibold text-blue-900 text-2xl">User's Name</p>
              <p className="py-2 text-gray-600 text-sm">{progress || "72 % completed!"}</p>
            </div>
          </div>

          <div className="text-right font-bold text-[4rem] text-blue-950 mx-12">
            My Goal Tracker
          </div>

        </div>
      </div>
    </div>
  );
}