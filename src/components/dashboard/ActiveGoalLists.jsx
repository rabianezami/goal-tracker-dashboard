import GoalCard from "../GoalCard";
import { useGoals } from "../../context/GoalsContext";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function ActiveGoalsList() {
  const { goals, removeGoal, addProgress, markComplete } = useGoals();
  const { t } = useTranslation("dashboard");

  const activeGoals = goals.filter(goal => goal.status === "active");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 750,
        mx: "auto",
        mt: 4,
        px: { xs: 1.5, sm: 2 },
        py: 2,
        backgroundColor: "#f8fafc",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "#2c3e50",
          borderBottom: "1px solid #e2e8f0",
          pb: 1
        }}
      >
        {t("activeGoals")}
      </Typography>

      <Stack spacing={2}>
        {activeGoals.map((goal) => (
          <GoalCard
            key={goal.id}
            {...goal}
            onDelete={removeGoal}
            onToggleStatus={markComplete}
            onAddProgress={addProgress}
            showActions={false}
            showMeta={false}
            showProgressText={false}
          />
        ))}
      </Stack>
    </Box>
  );
}