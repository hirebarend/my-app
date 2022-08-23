export function humanizeDistance(n: number): string {
  if (n < 1) {
    return "less than 1km";
  }

  return `${new Intl.NumberFormat("en-ZA", {
    maximumFractionDigits: 1,
  }).format(n)}km`;
}
