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
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
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
              <ListItemIcon>
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="primary">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>

              <ListItemText primary={item.label} sx={{ textAlign: "right" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Archive */}
      <Accordion sx={{ direction: "rtl" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>اهداف آرشیو شده</Typography>
        </AccordionSummary>
        

          {/* No complete */}
          <Accordion sx={{ direction: "rtl" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>اهداف کامل نشده</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
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
          <Accordion sx={{ direction: "rtl" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>اهداف کامل شده</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItemButton>
                  <ListItemText primary="مدیتیشن روزانه" />
                </ListItemButton>
              </List>
            </AccordionDetails>
          </Accordion>

        
      </Accordion>
    </Drawer>
  );
}
