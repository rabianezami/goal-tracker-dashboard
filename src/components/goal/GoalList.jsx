
import { Box, Stack } from "@mui/material";
import GoalCard from "./GoalCard";

export default function GoalList({
  goals,
  onEdit,
  onDelete,
  onToggleStatus,
  onOpenDetails,
  onAddProgress,
}) {
 
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 2,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Stack spacing={2}>
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            id={goal.id}
            title={goal.title}
            goalCategory={goal.goalCategory}
            description={goal.description}
            progress={goal.progress}
            target={goal.target}
            logs={goal.logs}
            date={goal.date}
            status={goal.status}
            color={goal.color}
            onEdit={() => onEdit(goal.id)}
            onDelete={() => onDelete(goal.id)}
            onToggleStatus={() => onToggleStatus(goal.id)}
            onClick={() => onOpenDetails(goal.id)}
            onAddProgress={() => onAddProgress(goal.id)}
          />
        ))}
      </Stack>
    </Box>
  );
}
