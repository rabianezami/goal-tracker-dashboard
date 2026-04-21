import { Box, Typography, Card, Grid, CardContent, Divider, Button } from "@mui/material";
import video from "../assets/video.json";
import Lottie from "lottie-react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
    const {t} = useTranslation("landingPage");

    return (
        <Box>
            {/* hero */}
            <Box>
                <Typography
                variant="h3"
                sx={{
                    textAlign: "center",
                    mt: 5,
                    fontWeight: 900,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                >
                    {t("page.MY_PATH")}
                </Typography>

                <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                }}
                >
                    <Lottie
                        animationData={video}
                        loop
                        style={{width: "100%", maxWidth: 600, height: "auto" }}
                    />
                </Box>
            </Box>

            {/* grided cards */}
            <Box sx={{ mt: 6, px: 2 }}>
                <Box sx={{ maxWidth: 1000, mx: "auto" }}>
                    <Grid container spacing={3} justifyContent="center">

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ p: 2, textAlign: "center" }}>
                                <CardContent>
                                    <Typography variant="h6">{t("page.GOAL_TRACKING")}</Typography>
                                    <Typography variant="body2">
                                        {t("page.TRACK_YOUR_DAILY")}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ p: 2, textAlign: "center" }}>
                                <CardContent>
                                    <Typography variant="h6">{t("page.FOCUS_SYSTEM")}</Typography>
                                    <Typography variant="body2">
                                        {t("page.STAY_CONSISTENT")}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ p: 2, textAlign: "center" }}>
                                <CardContent>
                                    <Typography variant="h6">{t("page.PROGRESS_INSIGHTS")}</Typography>
                                    <Typography variant="body2">
                                        {t("page.SEE_YOUR_GROWTH")}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box sx={{
                my: 5
            }}>
                <Divider
                    sx={{
                        borderColor: "gray",
                        mr: 20,
                        my: 1,
                    }}
                />
                <Divider
                    sx={{
                        borderColor: "gray",
                        mx: 24,
                        my: 1,
                    }}
                />
                <Divider
                    sx={{
                        borderColor: "gray",
                        ml: 12
                    }}
                />
            </Box>

            <Box sx={{ mt: 10, px: 2, mb: 8 }}>
                <Box sx={{ maxWidth: 900, mx: "auto" }}>

                    <Card
                        sx={{
                            p: 6,
                            textAlign: "center",
                            borderRadius: 3,
                            color: "white",
                            position: "relative",
                            overflow: "hidden",
                            background: "linear-gradient(270deg, #1976d2, #42a5f5, #1e88e5)",
                            backgroundSize: "600% 600%",
                            animation: "gradientMove 8s ease infinite",
                            boxShadow: "0 25px 80px rgba(25, 118, 210, 0.5)",
                            transition: "transform 0.4s ease",
                            "&:hover": {
                                transform: "translateY(-6px) scale(1.01)",
                            },
                            "@keyframes gradientMove": {
                            "0%": { backgroundPosition: "0% 50%" },
                            "50%": { backgroundPosition: "100% 50%" },
                            "100%": { backgroundPosition: "0% 50%" },
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                width: 250,
                                height: 250,
                                borderRadius: 3,
                                background: "rgba(255,255,255,0.15)",
                                filter: "blur(50px)",
                                top: -60,
                                left: -60,
                                animation: "float 6s ease-in-out infinite",
                                "@keyframes float": {
                                    "0%, 100%": { transform: "translateY(0px)" },
                                    "50%": { transform: "translateY(20px)" },
                                },
                            }}
                        />

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                mb: 2,
                                letterSpacing: 1,
                                animation: "fadeIn 1s ease",
                                "@keyframes fadeIn": {
                                    from: { opacity: 0, transform: "translateY(20px)" },
                                    to: { opacity: 1, transform: "translateY(0)" },
                                },
                            }}
                        >
                            {t("page.START_NOW")}
                        </Typography>

                        <Typography sx={{ mb: 4, opacity: 0.9 }}>
                            {t("page.YOUR_JOURNEY_BEGINS")}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>

                            <Button
                            component={NavLink}
                            to="/login"
                            variant="contained"
                            sx={{
                                backgroundColor: "white",
                                color: "#1976d2",
                                fontWeight: 700,
                                px: 4,
                                py: 1.2,
                                borderRadius: 3,

                                transition: "all 0.3s ease",
                                "&:hover": {
                                backgroundColor: "#f5f5f5",
                                transform: "scale(1.08)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                },
                            }}
                            >
                                {t("navbar.LOGIN")}
                            </Button>

                            <Button
                            component={NavLink}
                            to="/signup"
                            variant="outlined"
                            sx={{
                                borderColor: "white",
                                color: "white",
                                fontWeight: 700,
                                px: 4,
                                py: 1.2,
                                borderRadius: 3,

                                transition: "all 0.3s ease",
                                "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.15)",
                                transform: "scale(1.08)",
                                },
                            }}
                            >
                                {t("navbar.SIGNUP")} 
                            </Button>

                        </Box>

                    </Card>

                </Box>
            </Box>
        </Box>
    );
}