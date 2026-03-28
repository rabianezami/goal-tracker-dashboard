import { useMemo } from "react";
import { useGoals } from "../context/GoalsContext";
import { calculateXP } from "../components/utils/xpCalculator";

function normalizeDateToISO(value) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getGoalProgress(goal) {
  const target = Number(goal?.target || 0);
  const logs = Array.isArray(goal?.logs) ? goal.logs : [];

  let progressValue = 0;

  if (goal?.type === "daily") {
    const uniqueDates = new Set(
      logs
        .map((log) => normalizeDateToISO(log.date))
        .filter(Boolean)
    );
    progressValue = uniqueDates.size;
  } else if (logs.length > 0) {
    progressValue = logs.reduce((sum, log) => sum + Number(log.amount || 0), 0);
  } else {
    progressValue = Number(goal?.progress || 0);
  }

  return target > 0 ? Math.min(progressValue, target) : progressValue;
}

function calculateStreak(goals = [], includeToday = true) {
  const dailyGoals = goals.filter((goal) => goal?.type === "daily");

  if (dailyGoals.length === 0) return 0;

  const allDailyDates = dailyGoals
    .flatMap((goal) => (Array.isArray(goal.logs) ? goal.logs : []))
    .map((log) => normalizeDateToISO(log.date))
    .filter(Boolean);

  const uniqueDates = new Set(allDailyDates);

  let streak = 0;
  const cursor = new Date();

  if (!includeToday) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (true) {
    const todayISO = normalizeDateToISO(cursor);
    if (uniqueDates.has(todayISO)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function useUserStats(options = {}) {
  const { xpPerLog = 10, includeToday = true } = options;
  const { goals = [] } = useGoals() || {};

  return useMemo(() => {
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
    const completedGoals = goals.filter(
      (goal) => goal.status === "completed"
    ).length;

    const totalTarget = goals.reduce(
      (sum, goal) => sum + (Number(goal.target || 0) > 0 ? Number(goal.target || 0) : 0),
      0
    );

    const totalProgress = goals.reduce((sum, goal) => {
      const goalProgress = getGoalProgress(goal);
      return sum + goalProgress;
    }, 0);

    const overallProgress =
      totalTarget > 0 ? Math.round((totalProgress / totalTarget) * 100) : 0;

    const streak = calculateStreak(goals, includeToday);

    const xpTotal = calculateXP(goals, { xpPerLog });

    return {
      totalGoals,
      completedGoals,
      overallProgress,
      streak,
      xpTotal,
    };
  }, [goals, xpPerLog, includeToday]);
}