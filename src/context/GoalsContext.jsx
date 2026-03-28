import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { sampleGoals } from "../data/sampleGoals";

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
    if (saved && saved.length > 0) {
      return saved.map(normalizeGoal);
    }

    return normalizedSampleGoals;
  });

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
      prev.map((goal) => {
        if (String(goal.id) !== String(id)) return goal;

        return normalizeGoal({
          ...goal,
          ...updatedData,
          id: goal.id,
          updatedAt: new Date().toISOString(),
        });
      })
    );
  };

  const addProgress = (id, amount = 1) => {
    const now = new Date().toISOString();

    setGoals((prev) =>
      prev.map((goal) => {
        if (String(goal.id) !== String(id)) return goal;
        if (goal.status === "completed") return goal;

        const currentProgress = Number(goal.progress || 0);
        const target = Number(goal.target || 0);

        const rawAmount = Number(amount);
        const safeAmount = Number.isFinite(rawAmount) && rawAmount > 0 ? rawAmount : 1;

        const appliedAmount = goal.type === "daily" ? 1 : safeAmount;

        const remaining = target > 0 ? Math.max(target - currentProgress, 0) : appliedAmount;
        const finalAmount = target > 0 ? Math.min(appliedAmount, remaining) : appliedAmount;

        const nextProgress = target > 0
          ? Math.min(currentProgress + finalAmount, target)
          : currentProgress + finalAmount;

        const updatedGoal = {
          ...goal,
          progress: nextProgress,
          logs: [
            ...(Array.isArray(goal.logs) ? goal.logs : []),
            normalizeLog({
              date: now,
              amount: finalAmount,
            }),
          ],
          updatedAt: now,
        };

        if (target > 0 && nextProgress >= target) {
          updatedGoal.status = "completed";
        }

        return normalizeGoal(updatedGoal);
      })
    );
  };

  const markComplete = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        String(goal.id) === String(id)
          ? normalizeGoal({
              ...goal,
              status: "completed",
              updatedAt: new Date().toISOString(),
            })
          : goal
      )
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
    [goals]
  );

  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
}

export function useGoals() {
  const context = useContext(GoalsContext);

  if (!context) {
    throw new Error("useGoals must be used inside GoalsProvider");
  }

  return context;
}