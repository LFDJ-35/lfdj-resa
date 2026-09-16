class SessionEvent {
  title: string;
  from_date: Date;
  to_date: Date;
  description: string;

  constructor(title: string, from_date: Date, to_date: Date, description: string) {
    this.title = title;
    this.from_date = from_date;
    this.to_date = to_date;
    this.description = description;
  }
}

export { SessionEvent };
