export type GameType = "JDR" | "JDF" | "JCC" | "JDP";

export const ICON_MAP: Map<GameType, string> = new Map([
  ['JDF', 'swords'],
  ['JCC', 'playing_cards'],
  ['JDR', 'casino'],
  ['JDP', 'chess'],
])

