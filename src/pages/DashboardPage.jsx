import { useGoals } from "../context/GoalsContext"
import GoalList from "../components/GoalList"
import CustomeButton from "../components/dashboard/CustomeButton"
import { Container } from "@mui/material"

export default function Dashboard() {
  return (
   <Box p={2}>
      <DashBoardSummary />
      
      <Box mt={2}>
        <QuickActions />
      </Box>

      <Box mt={3}>
        <ActiveGoalsList />
      </Box>

  return (
    <Container maxWidth="lg">
      <CustomeButton />
      <div>
      <GoalList
        goals={goals}
        onEdit={() => {}}
        onDelete={removeGoal}
        onToggleStatus={() => {}}
        onOpenDetails={() => {}}
      />
      </div>
    </Container>
  )
}
