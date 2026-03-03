import { Box, Typography, Button } from "@mui/material";
import StatusChip from "../StatusChip";
import ProgressBarWithLabel from "../ProgressBarWithLabel";

export default function GoalSummarySection({
  goal,
  progressPercent,
  onAdd,
  onEdit,
  onComplete,
  onTogglePause,
}) {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h6">{goal.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {goal.category}
          </Typography>
        </Box>

        <StatusChip status={goal.status} />
      </Box>

      <ProgressBarWithLabel value={progressPercent} />

      <Box display="flex" gap={1} mt={2} flexWrap="wrap">
        <Button variant="contained" onClick={onAdd}>
            Add Progress
          </Button>

          <Button variant="outlined" onClick={onEdit}>Edit Goal</Button>

          <Button
            variant="contained"
            color="success"
            onClick={onComplete}
          >
            Mark Complete
          </Button>

          <Button
            variant="outlined"
            color="warning"
            onClick={onTogglePause}
          >
            {goal.status === "paused" ? "Resume" : "Pause"}
          </Button>
      </Box>

      <Typography variant="caption" color="text.secondary" mt={2} display="block">
        Created: {new Date(goal.createdAt).toLocaleDateString()}
      </Typography>
    </Box>
  );
}