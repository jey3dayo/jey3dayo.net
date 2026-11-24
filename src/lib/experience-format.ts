export function formatPeriod(start: number, end: number | null): string {
  return `${start} — ${end ?? "NOW"}`;
}
