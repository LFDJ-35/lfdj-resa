function format_date_day(date: Date): string {
  let day = `${date.getDate()}`;
  if (date.getDate() < 10) {
    day = `0${day}`;
  }

  let month = `${date.getUTCMonth()}`;
  if (date.getUTCMonth() < 10) {
    month = `0${month}`;
  }

  return `${day}/${month}/${date.getFullYear()}`
}

export { format_date_day }
