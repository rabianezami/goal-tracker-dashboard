import { useGoals } from "../context/GoalsContext"

export default function useUserStats() {
  const { goals } = useGoals()

  const completedGoals = goals.filter(g => g.status === "completed")

  const totalGoals = goals.length

  const completionRate =
    totalGoals === 0 ? 0 : Math.round((completedGoals.length / totalGoals) * 100)

  return {
    completionRate,
    completedCount: completedGoals.length,
  }
}