import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { navItems } from "../data/navigation";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const drawerWidth = 260;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  "&.active": {
                    bgcolor: "primary.light",
                    color: "primary.main",
                    fontWeight: 600,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {item.badge ? (
                    <Badge badgeContent={item.badge} color="primary">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  sx={{ textAlign: "right" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Archive */}
        <Box sx={{ p: 1 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>اهداف آرشیو شده</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              {/* Incomplete */}
              <Accordion disableGutters elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>اهداف کامل نشده</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    <ListItemButton>
                      <ListItemText primary="مطالعه کتاب" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText primary="ورزش" />
                    </ListItemButton>
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Complete */}
              <Accordion disableGutters elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>اهداف کامل شده</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    <ListItemButton>
                      <ListItemText primary="مدیتیشن روزانه" />
                    </ListItemButton>
                  </List>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Drawer>
  );
}
