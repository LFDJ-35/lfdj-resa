import { reactive } from "vue"
import { JCC_ID, JDF_ID, JDP_ID, JDR_ID } from "@/models/games";

// Membres en quête de jeu
export const FILTER_ID_REC = "rec";
// Membres en quête de covoiturage
export const FILTER_ID_COV = "cov";
// Tables de JDR
export const FILTER_ID_JDR = JDR_ID;
// Tables de JCC
export const FILTER_ID_JCC = JCC_ID;
// Tables de JDF
export const FILTER_ID_JDF = JDF_ID;
// Tables de JDP
export const FILTER_ID_JDP = JDP_ID;


export const filterStore = reactive(
  {
    hide: new Set()
  }
)
