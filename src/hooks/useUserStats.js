import { useMemo } from "react";
import { useGoals } from "../context/GoalsContext";
import { calculateXP } from "../components/utils/xpCalculator";
import { calculateStreak } from "../components/utils/calculateStreak";
import { calculateGlobalStreak } from "../components/utils/calculateGlobalStreak";

export function useUserStats(options = {}) {
  const { xpPerLog = 20, includeToday = false } = options;

  const { goals = [] } = useGoals() || {};

  return useMemo(() => {
    if (!goals.length) {
      return {
        totalGoals: 0,
        completedGoals: 0,
        overallProgress: 0,
        streak: 0,
        xpTotal: 0,
      };
    }

    const totalGoals = goals.length;

    const completedGoals = goals.filter((g) => g.status === "completed").length;

    const totalTarget = goals.reduce((sum, g) => {
      const t = Number(g.target || 0);
      return t > 0 ? sum + t : sum;
    }, 0);

    const totalProgress = goals.reduce((sum, g) => {
      const logs = g.logs || [];

      if (g.type === "daily") {
        const uniqueDays = new Set(logs.map((l) => l.date?.slice(0, 10)));
        return sum + uniqueDays.size;
      }

      return sum + logs.reduce((s, l) => s + Number(l.amount || 0), 0);
    }, 0);

    const overallProgress =
      totalTarget > 0 ? Math.round((totalProgress / totalTarget) * 100) : 0;

    const streak = calculateStreak(goals, includeToday);
    const globalStreak = calculateGlobalStreak(goals, includeToday);

    const xpTotal = calculateXP(goals, { xpPerLog });

    return {
      totalGoals,
      completedGoals,
      overallProgress,
      streak,
      globalStreak,
      xpTotal,
    };
  }, [goals, xpPerLog, includeToday]);
}
