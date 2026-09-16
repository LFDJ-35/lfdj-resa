import { TTRPGTableModel } from "./table_ttrpg";
import type { Place } from "./place";
import { SessionEvent } from "./event";

class LFDJSessionModel extends SessionEvent {

  tables: TTRPGTableModel[] = [];

  constructor(date: Date, place: Place, tables: TTRPGTableModel[]) {

    const begin_date = new Date(date.getTime());
    const end_date = new Date(date.getTime());
    begin_date.setHours(14, 0);
    end_date.setHours(1, 0);

    super("Session de jeu", begin_date, end_date, "Session de jeu de La Forge des Joueurs");
    this.tables = tables;
  }
}

export { LFDJSessionModel }
