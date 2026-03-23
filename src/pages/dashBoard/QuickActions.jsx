import { Stack, Button } from "@mui/material"
import { useGoals } from "../../context/GoalsContext"

export default function QuickActions() {
  const { addGoal } = useGoals()

  function handleAdd() {
    addGoal({
      title: "New Goal",
      category: "General",
      target: 100,
      color: "#6366F1",
    })
  }

  return (
    <Stack direction="row" spacing={2} mt={2}>
      <Button
        variant="contained"
        sx={{ borderRadius: 3, textTransform: "none" }}
        onClick={handleAdd}
      >
        + New Goal
      </Button>

      <Button
        variant="outlined"
        sx={{ borderRadius: 3, textTransform: "none" }}
      >
        Completed Goals
      </Button>
    </Stack>
  )
}