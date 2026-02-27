import {
  Box,
  ListItemButton,
  ListItemText,
  Typography,
  List,
  Divider,
  ListItemIcon,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import { navItems, archivedGoals } from "../data/navigation";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 230,
        minHeight: "calc(100vh - 64px)",
        borderRight: "1px solid",
        borderColor: "divider",
        p: 2,
        display: { xs: "none", md: "block" }, // responsive
      }}
    >
      {/* Navigation Title */}
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, color: "text.secondary" }}
      >
        NAVIGATION
      </Typography>

      {/* Main Navigation */}
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              "&.active": {
                bgcolor: "action.selected",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 55 }}>
              {item.badge ? (
                <Badge badgeContent={item.badge} color="primary">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Archive Section */}
      <Accordion disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">
            اهداف آرشیو شده
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 0 }}>

          {/* Incomplete */}
          <Accordion disableGutters elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">
                اهداف کامل نشده
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {archivedGoals.incomplete.map((goal) => (
                  <ListItemButton key={goal.id}>
                    <ListItemText primary={goal.title} />
                  </ListItemButton>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Complete */}
          <Accordion disableGutters elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2">
                اهداف کامل شده
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {archivedGoals.complete.map((goal) => (
                  <ListItemButton key={goal.id}>
                    <ListItemText primary={goal.title} />
                  </ListItemButton>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Footer */}
      <Typography variant="body2" color="text.secondary">
        Logged in as: <b>admin</b>
      </Typography>
    </Box>
  );
}