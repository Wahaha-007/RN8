export function getFormattedDate(date) {
  // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return date.toISOString().slice(0,10); // This method also work.
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}