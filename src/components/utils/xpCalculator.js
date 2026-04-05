export const DEFAULT_XP_PER_LOG = 10;

export function calculateXP(goals = [], opts = {}) {
  const { xpPerLog = DEFAULT_XP_PER_LOG, getXpForLog } = opts;

  if (!Array.isArray(goals)) return 0;

  return goals.reduce((total, goal) => {
    const logs = Array.isArray(goal?.logs) ? goal.logs : [];

    if (typeof getXpForLog === "function") {
      const goalXp = logs.reduce((logTotal, log) => {
        const xp = Number(getXpForLog(log, goal));
        return logTotal + (Number.isFinite(xp) ? xp : 0);
      }, 0);

      return total + goalXp;
    }

    return total + logs.length * xpPerLog;
  }, 0);
}