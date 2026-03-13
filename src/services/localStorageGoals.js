const STORAGE_KEY = "goal";

export function loadGoals(defaultGoals) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultGoals;
  } catch (error) {
    console.error("Error loading goals", error);
    return defaultGoals;
  }
}

export function saveGoals(goals) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error("Error saving goals", error);
  }
}