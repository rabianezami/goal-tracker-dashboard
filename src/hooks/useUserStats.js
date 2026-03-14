import { useMemo } from "react";
import { useGoals } from "../context/GoalsContext";
import { calculateXP } from "../components/utils/xpCalculator";

// function normalizeToISODate(value) {
//   if (!value) return null;
//   const d = new Date(value);
//   if (Number.isNaN(d.getTime())) return null;
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${y}-${m}-${day}`;
// }
export function normalizeToISODate(value) {
  if (!value) return null;

  const d = new Date(value);

  if (Number.isNaN(d.getTime())) return null;

  return d.toISOString().slice(0, 10);
}

export function useUserStats(options = {}) {
  const { xpOptions } = options;
  const { goals = [] } = useGoals();
  const stats = useMemo(() => {
    if (!Array.isArray(goals) || goals.length === 0) {
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

    const perGoalProgress = goals.map((g) => {
      const target = Number(g.target || 0);
      let progressValue = 0;

      const logs = Array.isArray(g.logs) ? g.logs : [];

      if (g.type === "daily") {
        const uniqDates = new Set(
          logs
            .map((l) => normalizeToISODate(l.date))
            .filter(Boolean)
        );
        progressValue = uniqDates.size;
      } else {
        if (logs.length > 0) {
          progressValue = logs.reduce((s, l) => s + Number(l.amount || 0), 0);
        } else {
          progressValue = Number(g.progress || 0);
        }
      }

      const capped = target > 0 ? Math.min(progressValue, target) : progressValue;

      return {
        id: g.id,
        target,
        progressValue,
        capped,
      };
    });

    const totalTarget = perGoalProgress.reduce((s, p) => s + (p.target || 0), 0);
    const totalCapped = perGoalProgress.reduce((s, p) => s + (p.capped || 0), 0);

    const overallProgress =
      totalTarget > 0 ? Math.round((totalCapped / totalTarget) * 100) : 0;

    const dailyGoals = goals.filter((g) => g.type === "daily");

    let streak = 0;
    if (dailyGoals.length > 0) {
      const allDailyDates = dailyGoals
        .flatMap((g) => (Array.isArray(g.logs) ? g.logs : []))
        .map((l) => normalizeToISODate(l.date))
        .filter(Boolean);

      const uniqueDateSet = new Set(allDailyDates);

      const today = new Date();
      const toLocalISO = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      };

      let cursor = new Date(); // today
      while (true) {
        const key = toLocalISO(cursor);
        if (uniqueDateSet.has(key)) {
          streak += 1;
          cursor.setDate(cursor.getDate() - 1); // previous day
        } else {
          break;
        }
      }
    }

    const xpTotal = calculateXP(goals, xpOptions);

    return {
      totalGoals,
      completedGoals,
      overallProgress,
      streak,
      xpTotal,
    };
  }, [goals, xpOptions]);

  return stats;
}