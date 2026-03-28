import { useUserStats } from "../hooks/useUserStats";

export default function Dashboard() {
  const {
    totalGoals,
    completedGoals,
    overallProgress,
    streak,
    xpTotal,
  } = useUserStats();

  return (
    <div>
      <h2>Stats</h2>

      <p>Total Goals: {totalGoals}</p>
      <p>Completed: {completedGoals}</p>
      <p>Progress: {overallProgress}%</p>
      <p>🔥 Streak: {streak}</p>
      <p>⭐ XP: {xpTotal}</p>
    </div>
  );
}