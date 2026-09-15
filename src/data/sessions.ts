import { LFDJSessionModel } from "@/models/session";
import { TTRPGTableModel } from "@/models/table_ttrpg";
import { BAIS, VITRE } from "./places";
import { FAKE_MEMBERS } from "./members";

const DATE_1 = new Date(2026, 8, 9);
const DATE_2 = new Date(2026, 9, 9);

const FAKE_SESSIONS: LFDJSessionModel[] = [
  new LFDJSessionModel(DATE_1, VITRE, [
    new TTRPGTableModel("Jeu de rôle 1", new Date(), "description", VITRE, FAKE_MEMBERS[0]!, 4),
    new TTRPGTableModel("Jeu de rôle 2", new Date(), "description", VITRE, FAKE_MEMBERS[1]!, 4)
  ]),
  new LFDJSessionModel(DATE_2, BAIS, [
    new TTRPGTableModel("Jeu de rôle 3", new Date(), "description", VITRE, FAKE_MEMBERS[0]!, 4),
    new TTRPGTableModel("Jeu de rôle 4", new Date(), "description", VITRE, FAKE_MEMBERS[1]!, 4)
  ]),
  new LFDJSessionModel(DATE_2, BAIS, [
    new TTRPGTableModel("Jeu de rôle 3", new Date(), "description", VITRE, FAKE_MEMBERS[0]!, 4),
    new TTRPGTableModel("Jeu de rôle 4", new Date(), "description", VITRE, FAKE_MEMBERS[1]!, 4)
  ]),
]

FAKE_SESSIONS.sort((a, b) => a.from_date.getTime() - b.from_date.getTime());

export { FAKE_SESSIONS }
