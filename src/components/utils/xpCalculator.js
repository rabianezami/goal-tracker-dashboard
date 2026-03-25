export const DEFAULT_XP_PER_LOG = 10;

export function calculateXP(goals = [], opts = {}) {
  const { xpPerLog = DEFAULT_XP_PER_LOG } = opts;

  if (!Array.isArray(goals)) return 0;

  return goals.reduce((total, g) => {
    const logsCount = Array.isArray(g.logs) ? g.logs.length : 0;
    return total + logsCount * xpPerLog;
  }, 0);
} 