import { getDateKey } from "./date";

export function calculateGlobalStreak(goals = [], includeToday = true) {
  const allLogs = goals.flatMap((g) => g.logs || []);

  if (!allLogs.length) return 0;

  const uniqueDates = new Set(
    allLogs.map((log) => getDateKey(log.date)).filter(Boolean),
  );

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
