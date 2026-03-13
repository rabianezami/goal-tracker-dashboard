const STORAGE_KEY = "goals";

export function getGoalsFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveGoalsToStorage(goals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

export function updateGoalInStorage(updatedGoal) {
  const goals = getGoalsFromStorage();

  const updatedGoals = goals.map((g) =>
    g.id === updatedGoal.id ? updatedGoal : g
  );

  saveGoalsToStorage(updatedGoals);
}