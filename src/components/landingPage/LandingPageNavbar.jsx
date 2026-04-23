import { Box, Typography, AppBar, Toolbar, Button, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LandingPageNavbar() {
    const {t} = useTranslation("landingPage");

    const linkStyle = ({ isActive }) => ({
        textDecoration: "none",
        color: isActive ? "#1976d2" : "inherit",
    });

    return (
        <Box sx={{
            position: "static",
        }}>
            <Toolbar sx={{
                display: "flex", 
                justifyContent: "space-between",
                pt: 2,
            }}>

                {/* Links */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button component={NavLink} to="/" style={linkStyle}>
                        {t("navbar.HOME")}
                    </Button>

                    <Button component={NavLink} to="/login" style={linkStyle}>
                        {t("navbar.LOGIN")}
                    </Button>

                    <Button component={NavLink} to="/signup" style={linkStyle}>
                        {t("navbar.SIGNUP")}
                    </Button>
                </Box>

            </Toolbar>
            <Divider
                sx={{
                    borderColor: "gray",
                    mr: 24,
                    my: 1,
                }}
            />
            <Divider
                sx={{
                    borderColor: "gray",
                    ml: 24
                }}
            />
        </Box>
    );
}