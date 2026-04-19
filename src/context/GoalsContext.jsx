import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { sampleGoals } from "../data/sampleGoals";
import useGoalCompletion from "../hooks/useGoalCompletion";

const GoalsContext = createContext(null);
const STORAGE_KEY = "goals";

function makeId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function safeParseGoals(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function normalizeLog(log = {}) {
  return {
    id: log.id != null ? String(log.id) : makeId("log"),
    date: log.date || new Date().toISOString(),
    amount: Number(log.amount ?? 1),
    note: log.note ?? "",
  };
}

function normalizeGoal(goal = {}) {
  const now = new Date().toISOString();
  return {
    id: goal.id != null ? String(goal.id) : makeId("goal"),
    title: goal.title ?? "",
    titleKey: goal.titleKey,
    category: goal.category ?? "",
    categoryKey: goal.categoryKey,
    description: goal.description ?? "",
    descriptionKey: goal.descriptionKey,
    type: goal.type ?? "count",
    target: Number(goal.target ?? 0),
    progress: Number(goal.progress ?? 0),
    status: goal.status ?? "active",
    date: goal.date ?? goal.createdAt ?? now,
    logs: Array.isArray(goal.logs) ? goal.logs.map(normalizeLog) : [],
    createdAt: goal.createdAt ?? now,
    updatedAt: goal.updatedAt ?? now,
    color: goal.color,
    icon: goal.icon,
    notes: goal.notes ?? "",
  };
}

const normalizedSampleGoals = sampleGoals.map(normalizeGoal);

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState(() => {
    if (typeof window === "undefined") return normalizedSampleGoals;
    const saved = safeParseGoals(localStorage.getItem(STORAGE_KEY));
    return saved?.map(normalizeGoal) || normalizedSampleGoals;
  });

  const { checkCompletion } = useGoalCompletion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goal) => {
    setGoals((prev) => [
      ...prev,
      normalizeGoal({
        ...goal,
        id: makeId("goal"),
        progress: 0,
        status: "active",
        logs: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    ]);
  };

  const removeGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => String(goal.id) !== String(id)));
  };

  const updateGoal = (id, updatedData) => {
    setGoals((prev) =>
      prev.map((goal) =>
        String(goal.id) === String(id)
          ? normalizeGoal({
              ...goal,
              ...updatedData,
              updatedAt: new Date().toISOString(),
            })
          : goal,
      ),
    );
  };

  const addProgress = (id, data) => {
    const { amount = 1, note = "", date = new Date().toISOString() } = data;
    const now = new Date().toISOString();

    setGoals((prev) =>
      prev.map((goal) => {
        if (String(goal.id) !== String(id)) return goal;
        if (goal.status === "completed") return goal;

        const numericAmount = Number(amount);
        if (!numericAmount || numericAmount <= 0) return goal;

        // only 1 in a day
        if (goal.type === "daily") {
          const today = date.slice(0, 10);

          const alreadyLogged = goal.logs.some(
            (log) => log.date.slice(0, 10) === today,
          );

          if (alreadyLogged) return goal;
        }

        // real amount
        const appliedAmount = goal.type === "daily" ? 1 : numericAmount;

        const target = Number(goal.target || 0);
        const current = Number(goal.progress || 0);

        const remaining = target > 0 ? target - current : appliedAmount;
        const finalAmount =
          target > 0 ? Math.min(appliedAmount, remaining) : appliedAmount;

        const newProgress =
          target > 0
            ? Math.min(current + finalAmount, target)
            : current + finalAmount;

        // new log
        const newLog = {
          id: `log-${Date.now()}`,
          date,
          amount: finalAmount,
          note,
        };

        return {
          ...goal,
          progress: newProgress,
          logs: [...goal.logs, newLog],
          updatedAt: now,
        };
      }),
    );
  };

  const markComplete = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        String(goal.id) === String(id)
          ? normalizeGoal({
              ...goal,
              progress: goal.target,
              status: "completed",
              updatedAt: new Date().toISOString(),
            })
          : goal,
      ),
    );
  };

  const value = useMemo(
    () => ({
      goals,
      addGoal,
      removeGoal,
      updateGoal,
      addProgress,
      markComplete,
      setGoals,
    }),
    [goals],
  );

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (!context) throw new Error("useGoals must be used inside GoalsProvider");
  return context;
}
