export function getDateKey(value) {
  if (!value) return null;

  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;

  return d.toISOString().slice(0, 10);
}
