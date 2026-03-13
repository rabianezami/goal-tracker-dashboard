import { useMemo } from "react";

function normalizeDateInput(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

export default function useGoalProgress(goal) {
  const computeTotal = (g) => {
    if (!g) return 0;

    if (g.type === "daily") {
      const uniq = new Set(
        (g.logs || []).map((l) => normalizeDateInput(l.date))
      );
      uniq.delete(null);
      return uniq.size;
    }

    return (g.logs || []).reduce(
      (sum, l) => sum + Number(l.amount || 0),
      0
    );
  };

  const total = useMemo(() => computeTotal(goal), [goal]);

  const target = Number(goal?.target || 0);

  const percent = useMemo(() => {
    if (!target) return 0;
    return Math.min(100, Math.round((total / target) * 100));
  }, [total, target]);

  const isCompleted = percent >= 100 || goal?.status === "completed";

  return {
    total,
    percent,
    isCompleted,
  };
}