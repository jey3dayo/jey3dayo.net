type WhoamiValue = string | readonly string[];

interface WhoamiLine {
  key: string;
  value: string;
}

const formatValue = (value: WhoamiValue): string =>
  typeof value === "string"
    ? JSON.stringify(value)
    : `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;

export function toWhoamiLines(entries: readonly (readonly [string, WhoamiValue])[]): WhoamiLine[] {
  return entries.map(([key, value], index) => ({
    key: JSON.stringify(key),
    value: `${formatValue(value)}${index < entries.length - 1 ? "," : ""}`,
  }));
}
