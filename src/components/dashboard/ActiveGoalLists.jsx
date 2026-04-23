import GoalCard from "../GoalCard";
import { useGoals } from "../../context/GoalsContext";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function ActiveGoalsList() {
  const { goals, removeGoal, addProgress } = useGoals();
  const { t } = useTranslation("dashboard");

  const activeGoals = goals.filter((goal) => goal.status === "active");

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "text.primary",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          pb: 1,
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
            onToggleStatus={() => {}}
            onAddProgress={addProgress}
            showActions={false}
            showMeta={false}
            showProgressText={false}
            showCheckbox={false}
          />
        ))}
      </Stack>
    </>
  );
}
