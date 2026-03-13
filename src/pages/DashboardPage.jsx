import { useGoals } from "../context/GoalsContext"
import GoalList from "../components/GoalList"

export default function Dashboard() {

  const { goals, removeGoal } = useGoals()

  return (
    <div>
      <GoalList
        goals={goals}
        onEdit={() => {}}
        onDelete={removeGoal}
        onToggleStatus={() => {}}
        onOpenDetails={() => {}}
      />
    </div>
  )
}