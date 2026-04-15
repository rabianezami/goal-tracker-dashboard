import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router";
export default function AuthLayout({ children }) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "background.default",
                px: 2
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    p: 4,
                }}
            >
                <Outlet />
            </Paper>
        </Box>
    )

}