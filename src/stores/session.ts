import { reactive } from "vue"

import { FAKE_SESSIONS } from "@/data/sessions"


export const sessionStore = reactive(
  {
    current: FAKE_SESSIONS[0]!
  }
)
