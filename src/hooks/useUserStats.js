import { useMemo } from "react";
import { useGoals } from "../context/GoalsContext";
import { calculateXP } from "../components/utils/xpCalculator";

function normalizeDateToISO(value, mode = "local") {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;

  if (mode === "utc") {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  } else {
    // local
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
}

export function useUserStats(options = {}) {
  const { xpOptions, progressSource = "logs", dateMode = "local", includeToday = true } = options;
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

    // single pass: collect per-goal progress + daily dates set, and counts
    const perGoalProgress = [];
    const dailyDateSet = new Set();
    let totalGoals = 0;
    let completedGoals = 0;

    for (const g of goals) {
      totalGoals += 1;
      if (g.status === "completed") completedGoals += 1;

      const target = Number(g.target || 0);
      const logs = Array.isArray(g.logs) ? g.logs : [];

      let progressValue = 0;

      if (g.type === "daily") {
        // collect unique local/utc dates from logs
        for (const l of logs) {
          const iso = normalizeDateToISO(l.date, dateMode);
          if (iso) dailyDateSet.add(iso);
        }
        // progressValue: number of unique dates for this goal
        // (we can compute per-goal unique count if needed; for overall we only need capped)
        const uniqDatesForGoal = new Set(
          logs.map((l) => normalizeDateToISO(l.date, dateMode)).filter(Boolean)
        );
        progressValue = uniqDatesForGoal.size;
      } else {
        // count/time -> sum amounts
        if (logs.length > 0) {
          progressValue = logs.reduce((s, l) => s + Number(l.amount || 0), 0);
        } else {
          // fallback policy: only use g.progress if progressSource == 'field' OR logs empty
          progressValue = Number(g.progress || 0);
        }
      }

      // If progressSource === 'field' we prefer stored g.progress over logs-derived value
      if (progressSource === "field") {
        progressValue = Number(g.progress || 0);
      } else if (progressSource === "logs" && logs.length === 0) {
        // we already used fallback above (g.progress) when logs empty; that is explicit
        // so behavior is: logs preferred, fallback to field only if no logs
      }

      const capped = target > 0 ? Math.min(progressValue, target) : progressValue;

      perGoalProgress.push({
        id: g.id,
        target,
        progressValue,
        capped,
      });
    }

    const totalTarget = perGoalProgress.reduce((s, p) => s + (p.target || 0), 0);
    const totalCapped = perGoalProgress.reduce((s, p) => s + (p.capped || 0), 0);

    const overallProgress = totalTarget > 0 ? Math.round((totalCapped / totalTarget) * 100) : 0;

    // STREAK: unique daily dates
    let streak = 0;
    if (dailyDateSet.size > 0) {
      // build cursor depending on includeToday
      const toISO = (d) => {
        if (dateMode === "utc") {
          const y = d.getUTCFullYear();
          const m = String(d.getUTCMonth() + 1).padStart(2, "0");
          const day = String(d.getUTCDate()).padStart(2, "0");
          return `${y}-${m}-${day}`;
        } else {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${y}-${m}-${day}`;
        }
      };

      const cursor = new Date();
      if (!includeToday) {
        cursor.setDate(cursor.getDate() - 1);
      }

      while (true) {
        const key = toISO(cursor);
        if (dailyDateSet.has(key)) {
          streak += 1;
          cursor.setDate(cursor.getDate() - 1);
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
  }, [goals, xpOptions, progressSource, dateMode, includeToday]);

  return stats;
}