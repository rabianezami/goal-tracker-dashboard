// components/GoalList.jsx
import { Box, Stack } from "@mui/material";
import GoalCard from "./GoalCard";
// import { useNavigate } from "react-router";

export default function GoalList({
  goals,
  onEdit,
  onDelete,
  onToggleStatus,
  onOpenDetails, 
  onAddProgress
}) {
  // const navigate = useNavigate();

  // function handleOpenDetails(id) {
  //   navigate(`/goals/${id}`);
  // }
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
            id={goal.id}
            title={goal.title}
            titleKey={goal.titleKey}
            categoryKey={goal.categoryKey}
            category={goal.category}
            progress={goal.progress}
            target={goal.target}
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
