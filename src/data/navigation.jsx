import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from '@mui/icons-material/Person';

export const navItems = [
  { label: "داشبورد", path: "/dashboard", icon: <DashboardIcon/> },
  { label: "همه اهداف", path: "/goals", icon: <FlagIcon />, badge: 4 },
  { label: "سلامتی", path: "/categories/health", icon: <FitnessCenterIcon />, badge: 1 },
  { label: "مطالعه", path: "/categories/study", icon: <SchoolIcon />, badge: 1 },
  { label: "کار", path: "/categories/work", icon: <WorkIcon />, badge: 2 },
  { label: "شخصی" , path: "/categories/personal", icon: <PersonIcon />, badge: 0 },
  { label: "تنظیمات", path: "/settings", icon: <SettingsIcon /> },
];
