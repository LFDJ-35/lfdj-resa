
const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
]

function add_leading_zero(n: number): string {
  if (n >= 10) {
    return `${n}`;
  }
  return `0${n}`;
}

function format_date_day(date: Date | undefined | null): string {

  if (date === undefined || date === null) { return "" }

  const day = add_leading_zero(date.getDate());
  const month = MONTHS[date.getUTCMonth() - 1];

  return `${day} ${month} ${date.getFullYear()}`
}

function format_date_hour(date: Date | undefined | null): string {
  if (date === undefined || date === null) { return "--:--" }

  const hours = add_leading_zero(date.getHours());
  const minutes = add_leading_zero(date.getMinutes());

  return `${hours}:${minutes}`;
}

export { format_date_day, format_date_hour }
