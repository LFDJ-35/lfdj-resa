import { LFDJSessionModel } from '@/models/session'
import { JCCTableModel } from '@/models/tables/table_jcc'
import { JDFTableModel } from '@/models/tables/table_jdf'
import { JDRTableModel } from '@/models/tables/table_jdr'
import { FAKE_MEMBERS } from './members'
import { BAIS, VITRE } from './places'

const DATE_1 = new Date(2026, 8, 9)
const DATE_2 = new Date(2026, 9, 9)

const BEGIN_DATE = new Date()
BEGIN_DATE.setHours(14, 0)

const END_DATE = new Date()
END_DATE.setHours(1, 0)

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

const FAKE_SESSIONS: LFDJSessionModel[] = [
  new LFDJSessionModel(DATE_1, VITRE, [
    new JDRTableModel(
      'Alien',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      4,
    ),
    new JDRTableModel(
      '7ème Mer',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[1]!,
      [FAKE_MEMBERS[3]!],
      4,
    ),
    new JDFTableModel(
      'Warhammer 40K',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      4,
    ),
    new JDFTableModel(
      'Battlefleet Gothic',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      4,
    ),
    new JCCTableModel(
      'Pokémon',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      2,
    ),
    new JCCTableModel(
      'One Piece',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      2,
    ),
  ]),
  new LFDJSessionModel(DATE_2, BAIS, [
    new JDRTableModel(
      'Cyberpunk RED',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      4,
    ),
    new JDRTableModel(
      'Cats ! La Mascarade',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[1]!,
      [FAKE_MEMBERS[3]!],
      4,
    ),
    new JDFTableModel(
      'BloodBowl - Ligue 2',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      2,
    ),
    new JCCTableModel(
      'Magic',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      4,
    ),
    new JCCTableModel(
      'Yu-Gi-Oh !',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      4,
    ),
  ]),
  new LFDJSessionModel(DATE_2, BAIS, [
    new JDRTableModel(
      'Tout le monde est John',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[3]!],
      4,
    ),
    new JDRTableModel(
      'Agone',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[1]!,
      [FAKE_MEMBERS[2]!],
      4,
    ),
    new JDFTableModel(
      'BloodBowl - Ligue 2',
      BEGIN_DATE,
      END_DATE,
      LOREM,
      FAKE_MEMBERS[0]!,
      [FAKE_MEMBERS[2]!],
      2,
    ),
  ]),
]

FAKE_SESSIONS.sort((a, b) => a.from_date.getTime() - b.from_date.getTime())

export { FAKE_SESSIONS }
