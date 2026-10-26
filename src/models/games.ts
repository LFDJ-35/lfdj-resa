export type GameType = "JDR" | "JDF" | "JCC" | "JDP";

export const JDF_ID = "JDF"
export const JCC_ID = "JCC"
export const JDR_ID = "JDR"
export const JDP_ID = "JDP"

export const ICON_MAP: Map<GameType, string> = new Map([
  [JDF_ID, 'swords'],
  [JCC_ID, 'playing_cards'],
  [JDR_ID, 'casino'],
  [JDP_ID, 'chess'],
])

