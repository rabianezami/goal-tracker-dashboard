import {
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import CategoryChip from "../components/categories/CategoryChip";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useGoals } from "../context/GoalsContext";
import DashboardContainer from "../components/dashboard/DashboardContainer";

export default function Categories() {
  const { t } = useTranslation("categories");

  const { goals, setGoals } = useGoals();

  const categoriesMap = {};

  goals.forEach((goal) => {
    const cat = goal.goalCategory;

    if (!categoriesMap[cat]) {
      categoriesMap[cat] = { name: cat, total: 0 };
    }

    categoriesMap[cat].total += 1;
  });

  const categories = Object.values(categoriesMap);

  const [anchorlEl, setAnchorlEl] = useState(null);

  const open = Boolean(anchorlEl);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (e, cat) => {
    setAnchorlEl(e.currentTarget);
    setSelectedCategory(cat);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setAnchorlEl(null);
  };

  const handleDelete = (category) => {
    const updatedGoals = goals.filter((goal) => goal.goalCategory !== category);

    setGoals(updatedGoals);
  };

  return (
    <DashboardContainer>
      <Box
        sx={{
          my: 2,
        }}
      >
        <Typography variant="h6">{t("title")}</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          mt: 1,
          mx: "auto",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "primary.light",
            fontSize: 16,
          }}
        >
          {t("description")}
        </Typography>
        <Button variant="contained" sx={{}}>
          {t("addCat")}
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          columnGap: 2,
          my: 4,
        }}
      >
        {categories.map((cat) => (
          <Box key={cat.name}>
            <CategoryChip
              pathTo={`/category/${cat.name}`}
              categoryName={cat.name}
            />
          </Box>
        ))}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("table.catName")}</TableCell>
              <TableCell>{t("table.totalGoals")}</TableCell>
              <TableCell>{t("table.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.name}>
                <TableCell
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {cat.name}
                </TableCell>
                <TableCell>{DigitConvertor(cat.total)}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleClick(e, cat.name)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorlEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 2,
                        boxShadow: 1,
                        minWidth: 150,
                        p: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      sx={{
                        borderRadius: 1,
                        gap: 1,
                        "&:hover": {
                          backgroundColor: "#c7d3e0",
                        },
                      }}
                    >
                      <EditIcon
                        fontSize="small"
                        sx={{
                          color: "primary.light",
                        }}
                      />
                      {t("menu.edit")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleDelete(selectedCategory)}
                      sx={{
                        borderRadius: 1,
                        gap: 1,
                        "&:hover": {
                          backgroundColor: "#c7d3e0",
                        },
                      }}
                    >
                      <DeleteOutlineIcon
                        fontSize="small"
                        sx={{
                          color: "primary.light",
                        }}
                      />
                      {t("menu.delete")}
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardContainer>
  );
}

function DigitConvertor(str) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.toString().replace(/[0-9]/g, function (digit) {
    return persianDigits[parseInt(digit)];
  });
}
