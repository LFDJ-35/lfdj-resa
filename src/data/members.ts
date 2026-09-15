import { Member } from "@/models/member"

const AVAILABLE_MEMBER_SENTINEL = new Member("", "", "0");

const FAKE_MEMBERS = [
  new Member("Ash", "Alex"),
  new Member("Alistar", "Nicolas"),
  new Member("Empire34", "Lucie")
]

export { AVAILABLE_MEMBER_SENTINEL, FAKE_MEMBERS }
