export function formatDate(dateRaw: string) {
  const date = new Date(dateRaw);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
