import { TableModel } from "@/models/tables/table_session";
import type { Place } from "@/models/place";
import { SessionEvent } from "@/models/event";

class LFDJSessionModel extends SessionEvent {

  tables: TableModel[] = [];

  constructor(date: Date, place: Place, tables: TableModel[]) {

    const begin_date = new Date(date.getTime());
    const end_date = new Date(date.getTime());
    begin_date.setHours(14, 0);
    end_date.setHours(1, 0);

    super("Session de jeu", begin_date, end_date, "Session de jeu de La Forge des Joueurs");
    this.tables = tables;
  }

  addTable(table: TableModel){
    // TODO : Enregistrer la table en base de données.
    this.tables.push(table)
  }

  removeTable(table: TableModel){
    // TODO : Supprimer la table en base de données.
    const idx = this.tables.findIndex((val) => val.id === table.id)
    if(idx === -1){ return }

    this.tables.splice(idx, 1);
  }
}

export { LFDJSessionModel }
