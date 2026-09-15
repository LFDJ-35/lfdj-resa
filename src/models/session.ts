import { TTRPGTableModel } from "./table_ttrpg";
import type { Place } from "./place";
import { LFDJEvent } from "./event";

class LFDJSessionModel extends LFDJEvent {

  tables: TTRPGTableModel[] = [];

  constructor(date: Date, place: Place, tables: TTRPGTableModel[]) {
    super("Session de jeu", date, "Session de jeu de La Forge des Joueurs", place);
    this.tables = tables;
  }
}

export { LFDJSessionModel }
