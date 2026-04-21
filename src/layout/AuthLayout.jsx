import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
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