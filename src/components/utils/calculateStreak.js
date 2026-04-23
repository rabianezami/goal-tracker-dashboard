import { getDateKey } from "./date";

export function calculateStreak(goals = [], includeToday = true) {
  const dailyGoals = goals.filter((g) => g?.type === "daily");

  if (!dailyGoals.length) return 0;

  const allDates = dailyGoals
    .flatMap((g) => g.logs || [])
    .map((log) => getDateKey(log.date))
    .filter(Boolean);

  if (!allDates.length) return 0;

  const uniqueDates = new Set(allDates);

  const cursor = new Date();

  if (!includeToday) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  let streak = 0;

  while (true) {
    const key = getDateKey(cursor);

    if (uniqueDates.has(key)) {
      streak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
