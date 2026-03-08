// components/GoalList.jsx
import { Box, Stack } from "@mui/material";
import GoalCard from "./GoalCard";
export default function GoalList({ goals, onEdit, onDelete, onToggleStatus }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 2,
        px: { xs: 1, sm: 2 }
      }}
    >
      <Stack spacing={2}>
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            title={goal.title}
           id={goal.id}
            category={goal.category}
            progress={goal.progress}
            date={goal.date}
            status={goal.status}
            color={goal.color}
            onEdit={() => onEdit(goal.id)}
            onDelete={() => onDelete(goal.id)}
            onToggleStatus={() => onToggleStatus(goal.id)}
          />
        ))}
      </Stack>
    </Box>
  );
}