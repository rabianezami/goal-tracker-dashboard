import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Chip, Divider } from "@mui/material";

import {
  getGoalsFromStorage,
  updateGoalInStorage,
} from "../components/utils/goalStorage";

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [goal, setGoal] = useState(null);

  useEffect(() => {
    const goals = getGoalsFromStorage();
    const found = goals.find((g) => String(g.id) === id);

    if (!found) {
      navigate("/not-found");
      return;
    }

    setGoal(found);
  }, [id, navigate]);

  if (!goal) return null;

  const handleToggleComplete = () => {
    const updatedGoal = {
      ...goal,
      status: goal.status === "completed" ? "active" : "completed",
    };

    updateGoalInStorage(updatedGoal);
    setGoal(updatedGoal);
  };

  return (
    <Box>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {goal.title}
        </Typography>

        <Chip label={goal.category} sx={{ mb: 2 }} color="primary" />

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ mb: 3 }}>
          {goal.description}
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Due Date: {goal.dueDate}
        </Typography>

        <Button
          variant="contained"
          color={goal.status === "completed" ? "success" : "primary"}
          onClick={handleToggleComplete}
        >
          {goal.status === "completed" ? "Completed" : "Mark as Completed"}
        </Button>
      </Paper>
    </Box>
  );
}
