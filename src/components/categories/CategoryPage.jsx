import { Box, Container, Typography, Divider, Paper } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import Chart from "./CategoryPageChart";
import { useGoals } from "../../context/GoalsContext";

export default function CategoryPage() {
  const { t } = useTranslation("categories");
  const { categoryName } = useParams();
  const { goals = [] } = useGoals();

  const categoryLabel = t(`categoriesName.${categoryName}`, {
    defaultValue: categoryName,
  });

 
  const filteredGoals = goals.filter(
    (goal) => goal.goalCategory?.toLowerCase() === categoryName?.toLowerCase()
  );

  const total = filteredGoals.length;

 // calculation of goals
  const completedGoals = filteredGoals.filter((goal) => {
    const target = Number(goal.target || 0);
    const progress = Number(goal.progress || 0); 
    
    if (!target) return false;

    return progress >= target || goal.status === "completed";
  });

  const completed = completedGoals.length;
  const active = total - completed; 

  return (
    <Container>
      <Box sx={{ my: 3, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={600}>
          {t("titleCat", { cat: categoryLabel })}
        </Typography>
      </Box>
      <Divider />

      {total === 0 ? (
        <Paper elevation={0} sx={{ mt: 8, p: 5, textAlign: "center" }}>
          <InboxIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" fontWeight={600}>{t("noGoals")}</Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>{t("description")}</Typography>
        </Paper>
      ) : (
        <>
          <Box sx={{ maxWidth: 400, mx: "auto", my: 4 }}>
            <CategoryCard title={categoryLabel} total={total} active={active} completed={completed} goals={filteredGoals} />

          </Box>
          <Box sx={{ mt: 6 }}>
            <Chart goals={filteredGoals} />
          </Box>
        </>
      )}
    </Container>
  );
}