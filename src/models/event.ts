import { Place } from "./place"

class LFDJEvent {
  title: string;
  from_date: Date;
  to_date: Date;
  description: string;
  place: Place;

  constructor(title: string, date: Date, description: string, place: Place) {
    this.title = title;
    this.from_date = date;
    this.to_date = date;
    this.description = description;
    this.place = place;
  }
}

export { LFDJEvent };
