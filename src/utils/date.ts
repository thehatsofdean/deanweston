export function formatDate(date: Date) {
  return date
    .toLocaleDateString("en-GB", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    .replace(",", "");
}
