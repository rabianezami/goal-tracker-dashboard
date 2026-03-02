import { Box, Typography, Avatar, Paper, Button, IconButton } from "@mui/material";
import bgImage from "../assets/bg.webp"
import { useTranslation } from "react-i18next"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar({ completed, userName, uncompleted, onMenueClick }) {
  const {t} = useTranslation("navigation");

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        mx: 0,
        py: 2,
        boxShadow: 3,
        height: {
          lg: "12vh",
        },
        // background:  You can also use from this gradient as well
        //   theme.palette.mode === "dark" 
        //   ? "linear-gradient(109.5deg, rgba(5, 125, 185, 0.668) 9.4%, rgba(5, 58, 112, 0.546) 78.4%)"
        //   : "linear-gradient(109.5deg, rgba(8, 125, 242, 0.801) 9.4%, rgba(5, 104, 203, 0.596) 78.4%)",
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
        backgroundPosition: " center center",
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
          sx={{
            display: "flex",
            alignItems: "center",
            gap:0,
            justifyItems: "start",
            px: 0,
            mx: 0
          }}
        >
          <IconButton variant="text"
              onClick={onMenueClick}
              sx={{
                px: 2
              }}
            >
              <MenuIcon 
                sx={{
                  fontSize: 30,
                  color: "secondary.light"
                }}
              />
          </IconButton>
          <Box
            elevation={4}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              px: 1,
              backgroundColor: "transparent",
            }}
          >
            <Avatar
              sx={{
                width: 45,
                height: 45,
              }}
            >
              <AccountCircleIcon 
                sx={{
                  fontSize: 60,
                  color: "secondary.light",
                  boxShadow: 3,
                }} 
              />
            </Avatar>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: "#07335e",
                  fontSize: {
                    lg: "1.5rem",
                  },
                }}
              >
                {userName || "User's Name"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: {
                    sm: "row",
                    xl: "column"
                  },
                  gap: {
                    xl: 2,
                    xs: 0
                  },
                  fontSize: 12,
                  color: "#07335e"
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mt: {
                      sm: 0,
                      lg: 0.5
                    },
                    flexWrap: "wrap"
                  }}
                >
                {t("navbar.completedGoals", { percent: completed })}   
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mt: {
                      sm: 0,
                      lg: 0.5
                    },
                    flexWrap: "wrap"
                  }}
                >
                {t("navbar.notCompletedGoals", { percent: uncompleted })}   
                </Typography>
              </Box>
              
            </Box>
          </Box>
        </Box>
        
        <Typography
          variant="h3"
          sx={{
            color: "secondary.light",
            letterSpacing: 1,
            px: {
              xl: 4,
              lg: 4,
              sm: 1,
              md: 1.5
            },
            textShadow: "2px 2px 6px rgba(0,0,0,10)",
            display: { xs: "none", sm: "block", }
          }}
        >
          {t("navbar.myPath")}
        </Typography>
      </Box>
    </Box>
  );
}