import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  Toolbar,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const drawerWidth = 220;

export default function Sidebar({
  isMobile,
  mobileOpen,
  onClose,
}) {
  const { t } = useTranslation("navigation");

  const navItems = [
    { key: "dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { key: "allGoals", path: "/goals", icon: <FlagIcon /> },
    { key: "newGoal", path: "/goals/new", icon: <FlagIcon /> },
    { key: "health", path: "/health", icon: <FitnessCenterIcon /> },
    { key: "study", path: "/study", icon: <SchoolIcon /> },
    { key: "business", path: "/business", icon: <WorkIcon /> },
    { key: "personal", path: "/personal", icon: <PersonIcon /> },
    { key: "categories", path: "/categories", icon: <AddToPhotosIcon />},
    { key: "settings", path: "/settings", icon: <SettingsIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
   
      {isMobile && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h6">
              {t("sidebar.menu")}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
        </>
      )}

      {/* Main Navigation */}
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.key}
            component={NavLink}
            to={item.path}
            onClick={isMobile ? onClose : undefined}
            sx={{
              "&.active": {
                bgcolor: "action.selected",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={t(`sidebar.${item.key}`)} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Accordion
        disableGutters
        elevation={0}
        square
        sx={{
          bgcolor: "transparent",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            px: 2,
            minHeight: 48,
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          <Typography variant="body1">
            {t("sidebar.archive")}
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>
          <List dense disablePadding>
            <ListItemButton
              onClick={isMobile ? onClose : undefined}
              sx={{
                pl: 4,
                "&.active": {
                  bgcolor: "action.selected",
                },
              }}
            >
              <ListItemText
                primary={t("sidebar.completed")}
              />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: drawerWidth,
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Toolbar />
          {drawerContent}
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              borderRadius: 0,
              top: 0,
              bottom: 0,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
