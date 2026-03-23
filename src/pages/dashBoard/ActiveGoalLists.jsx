import { useGoals } from "../../context/GoalsContext"
import GoalList from "../../components/GoalList"

export default function ActiveGoalsList() {
  const { activeGoals, removeGoal, updateGoal, addProgress } = useGoals()

  function handleToggleStatus(id) {
    const goal = activeGoals.find(g => g.id === id)
    const newStatus =
      goal.status === "completed" ? "active" : "completed"

    updateGoal(id, { status: newStatus })
  }

  return (
    <GoalList
      goals={activeGoals}
      onEdit={() => {}}
      onDelete={removeGoal}
      onToggleStatus={handleToggleStatus}
      onAddProgress={addProgress}
    />
  )
}