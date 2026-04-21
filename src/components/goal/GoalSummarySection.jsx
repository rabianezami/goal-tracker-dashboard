import { Box, Typography, Button } from "@mui/material";
import StatusChip from "../StatusChip";
import ProgressBarWithLabel from "../ProgressBarWithLabel";
import { useTranslation } from "react-i18next";

export default function GoalSummarySection({
  goal,
  progressPercent,
  onAdd,
  onEdit,
  onComplete,
  onTogglePause,
}) {
  const { t } = useTranslation("goalDetails");
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h5" mb={1}>
            {goal.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              bgcolor: "action.hover",
              px: 1,
              py: 0.3,
              borderRadius: 2,
              display: "inline-block",
              mt: 0.5,
            }}
          >
            {goal.goalCategory}
          </Typography>
        </Box>

        <StatusChip status={goal.status} />
      </Box>

      <Box my={2}>
        <Typography variant="body2">
          {t("description")} : {goal.description}
        </Typography>
      </Box>

      <ProgressBarWithLabel value={progressPercent} />

      <Box display="flex" gap={1} mt={4} flexWrap="wrap">
        <Button variant="contained" onClick={onAdd}>
          {t("buttons.addProgress")}
        </Button>

        <Button variant="outlined" onClick={onEdit}>
          {t("buttons.editGoal")}
        </Button>

        <Button variant="contained" color="success" onClick={onComplete}>
          {t(
            goal.status === "completed"
              ? "buttons.reopenGoal"
              : "buttons.markComplete",
          )}
        </Button>

        <Button variant="outlined" color="warning" onClick={onTogglePause}>
          {t(
            goal.status === "paused"
              ? "buttons.pauseResume"
              : "buttons.pauseResume",
          )}
        </Button>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        mt={2}
        display="block"
      >
        {t("summary.createdDate")}:{" "}
        {new Date(goal.createdAt).toLocaleDateString()}
      </Typography>
    </Box>
  );
}
