import { LFDJSessionModel } from "@/models/session";
import { JCCTableModel } from "@/models/tables/table_jcc";
import { JDFTableModel } from "@/models/tables/table_jdf";
import { JDRTableModel } from "@/models/tables/table_jdr";
import { FAKE_MEMBERS } from "./members";
import { BAIS, VITRE } from "./places";
import { JDPTableModel } from "@/models/tables/table_jdp";

const DATE_1 = new Date(2026, 8, 9);
const DATE_2 = new Date(2026, 9, 9);

const DATE_AFTERNOON = new Date();
DATE_AFTERNOON.setHours(14, 0);

const DATE_EVENING = new Date();
DATE_EVENING.setHours(20, 30)

const END_DATE = new Date();
END_DATE.setHours(1, 0);

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const FAKE_SESSIONS: LFDJSessionModel[] = [
  new LFDJSessionModel(DATE_1, VITRE, [
    new JDRTableModel("Alien", DATE_AFTERNOON, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 4),
    new JDRTableModel("7ème Mer", DATE_EVENING, END_DATE, LOREM, FAKE_MEMBERS[1]!, [FAKE_MEMBERS[3]!], 4),
    new JDFTableModel("Warhammer 40K", DATE_EVENING, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 4),
    new JDFTableModel("Battlefleet Gothic", DATE_AFTERNOON, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 4),
    new JCCTableModel("Pokémon", DATE_EVENING, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 2),
    new JCCTableModel("One Piece", DATE_EVENING, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 2),
    new JDPTableModel("Root", DATE_AFTERNOON, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 4)
  ]),
  new LFDJSessionModel(DATE_2, BAIS, [
    new JDRTableModel("Cyberpunk RED", DATE_AFTERNOON, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 4),
    new JDRTableModel("Cats ! La Mascarade", DATE_EVENING, END_DATE, LOREM, FAKE_MEMBERS[1]!, [FAKE_MEMBERS[3]!], 4),
    new JDFTableModel("BloodBowl - Ligue 2", DATE_AFTERNOON, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 2),
    new JCCTableModel("Magic", DATE_EVENING, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 4),
    new JCCTableModel("Yu-Gi-Oh !", DATE_AFTERNOON, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 4),

  ]),
  new LFDJSessionModel(DATE_2, BAIS, [
    new JDRTableModel("Tout le monde est John", DATE_AFTERNOON, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[3]!], 4),
    new JDRTableModel("Agone", DATE_EVENING, END_DATE, LOREM, FAKE_MEMBERS[1]!, [FAKE_MEMBERS[2]!], 4),
    new JDFTableModel("BloodBowl - Ligue 2", DATE_AFTERNOON, END_DATE, LOREM, FAKE_MEMBERS[0]!, [FAKE_MEMBERS[2]!], 2),
  ]),
]

FAKE_SESSIONS.sort((a, b) => a.from_date.getTime() - b.from_date.getTime());

export { FAKE_SESSIONS };
