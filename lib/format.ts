export function formatDate(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateRange(start?: string, end?: string): string {
  if (!start) return "";
  if (!end) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
}
