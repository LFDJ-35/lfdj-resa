import { Place } from "./place"

class LFDJEvent
{
    title: string;
    date: Date;
    description: string;
    place: Place;

    constructor(title: string, date: Date, description: string, place: Place)
    {
        this.title = title;
        this.date = date;
        this.description = description;
        this.place = place;
    }
}

export {LFDJEvent};