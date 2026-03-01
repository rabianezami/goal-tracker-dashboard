import { Box, Typography, Avatar, Paper } from "@mui/material";
import user from "../assets/user-image.webp";
import bgImage from "../assets/bg.webp"

export default function Navbar({ progress, userName }) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        mx: 0,
        py: 2,
        boxShadow: 3,
        height: "14vh",
        backgroundImage:
          theme.palette.mode === "dark"
            ? `
              linear-gradient(
                rgba(0,0,0,0.25),
                rgba(255,255,225,0.1)
              ),
              url(${bgImage})
            `
            : `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          elevation={4}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            px: 3,
            backgroundColor: "transparent",
          }}
        >
          <Avatar
            src={user}
            alt="User"
            sx={{
              width: 70,
              height: 70,
              boxShadow: 3,
            }}
          />

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "primary.dark",
              }}
            >
              {userName || "User's Name"}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mt: 0.5,
              }}
            >
              {progress || "72% completed!"}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "primary.dark",
            letterSpacing: 1,
            textShadow: "2px 2px 6px rgba(225,225,225,10)",
          }}
        >
          My Goal Tracker
        </Typography>
      </Box>
    </Box>
  );
}