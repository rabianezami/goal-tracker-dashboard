import { useGoals } from "../context/GoalsContext"
import GoalList from "../components/GoalList"
import CustomeButton from "../components/dashboard/CustomeButton"
import { Container } from "@mui/material"

export default function Dashboard() {

  const { goals, removeGoal } = useGoals()

  return (
    <Container maxWidth="lg">
      <DashboardHeader />
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
