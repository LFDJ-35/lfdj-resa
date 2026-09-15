import { Place } from "./place"

class LFDJEvent {
  title: string;
  from_date: Date;
  to_date: Date;
  description: string;
  place: Place;

  constructor(title: string, from_date: Date, to_date: Date, description: string, place: Place) {
    this.title = title;
    this.from_date = from_date;
    this.to_date = to_date;
    this.description = description;
    this.place = place;
  }
}

export { LFDJEvent };
