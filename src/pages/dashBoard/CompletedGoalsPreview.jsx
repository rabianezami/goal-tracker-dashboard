import { useGoals } from "../../context/GoalsContext"
import GoalList from "../../components/GoalList"

export default function CompletedGoalsPreview() {
  const { completedGoals } = useGoals()

  return (
    <GoalList
      goals={completedGoals}
      onEdit={() => {}}
      onDelete={() => {}}
      onToggleStatus={() => {}}
      onAddProgress={() => {}}
    />
  )
}