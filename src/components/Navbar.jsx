import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "react-i18next";
import navbarBg from "../assets/navbar-bg.jpg";
import { useTheme } from "@mui/material";

export default function Navbar({ completed, uncompleted, user, onMenuClick }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useTranslation("navigation");

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderRadius: 0,
        backgroundImage: `url(${navbarBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.25)",
        }}
      />
      <Toolbar
        sx={{
          position: "relative",
          zIndex: 1,
          justifyContent: "space-between",
          py: 1,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.4rem",
                md: "1.8rem",
                lg: "2.5rem",
              },
            }}
          >
            {t("navbar.myPath")}
          </Typography>
        </Stack>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1,
            backgroundColor: isDark
              ? "rgba(30,30,30,0.55)"
              : "rgba(255,255,255,0.75)",
            backdropFilter: "blur(10px)",
            color: isDark ? "#fff" : "#000",
          }}
        >
          <Avatar src={user?.avatar || ""} alt={user?.name || "User"}>
            {!user?.avatar && <AccountCircleIcon fontSize="large" />}
          </Avatar>

          <Box>
            <Typography
              variant="body2"
              sx={{ opacity: 0.85, fontWeight: "bold", wordSpacing: "2px" }}
            >
              {t("navbar.completedGoals", { percent: completed })} •{" "}
              {t("navbar.notCompletedGoals", { percent: uncompleted })}
            </Typography>
          </Box>
        </Paper>
      </Toolbar>
    </AppBar>
  );
}
