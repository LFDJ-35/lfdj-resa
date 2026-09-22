
import { Carpool, type ICarpool } from "@/models/carpool"
import { FAKE_MEMBERS } from "./members"

const FAKE_CARPOOLS: Array<ICarpool> = [
  new Carpool(FAKE_MEMBERS[0]!, "Vitré", "Après-midi", [FAKE_MEMBERS[1]!], 1),
  new Carpool(FAKE_MEMBERS[2]!, "Torcé", "Soirée", [FAKE_MEMBERS[3]!], 4),
]

export { FAKE_CARPOOLS }
