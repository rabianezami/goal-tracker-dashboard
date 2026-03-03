import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const drawerWidth = 190;

export default function Sidebar() {
  const { t } = useTranslation("navigation");

  const navItems = [
    { key: "dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { key: "allGoals", path: "/goals", icon: <FlagIcon /> },
    { key: "health", path: "/categories/health", icon: <FitnessCenterIcon /> },
    { key: "study", path: "/categories/study", icon: <SchoolIcon /> },
    { key: "business", path: "/categories/business", icon: <WorkIcon /> },
    { key: "personal", path: "/categories/personal", icon: <PersonIcon /> },
  ];

  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: { md: "block" },
        borderLeft: "1px solid",
        borderColor: "divider",
        height: "100%",
        p: 1,
        background: "white",
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.key}
            component={NavLink}
            to={item.path}
            sx={{
              "&.active": {
                bgcolor: "action.selected",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 44 }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={t(`sidebar.${item.key}`)}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Accordion disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            {t("sidebar.archive")}
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          <List dense>
            <ListItemButton>
              <ListItemText
                primary={t("sidebar.completed")}
              />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}