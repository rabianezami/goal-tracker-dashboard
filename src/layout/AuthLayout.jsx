import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import LandingPageNavbar from "../components/landingPage/LandingPageNavbar";

export default function AuthLayout() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "background.default",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <LandingPageNavbar />

            <Box sx={{ flex: 1, my: 4 }}>
                <Outlet />
            </Box>
        </Box>
    );
}