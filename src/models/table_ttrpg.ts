import { Member } from './member'
import { Place } from './place'
import { LFDJEvent } from './event'
import { AVAILABLE_MEMBER_SENTINEL } from '@/data/members'

class TTRPGTableModel extends LFDJEvent {
  max_players: number
  author: Member
  players: Member[]
  player_number: number = 0

  constructor(
    title: string,
    from_date: Date,
    to_date: Date,
    description: string,
    place: Place,
    author: Member,
    max_players: number,
  ) {
    super(title, from_date, to_date, description, place)
    this.author = author
    this.max_players = max_players
    this.players = Array.from({ length: max_players })
    this.players.fill(AVAILABLE_MEMBER_SENTINEL, 0, max_players)
  }

  add_player(member: Member): boolean {
    const first_available = this.players.findIndex(
      (value, _idx, _arr) => value.id === AVAILABLE_MEMBER_SENTINEL.id,
    )

    if (first_available === -1) {
      return false
    }

    this.players[first_available] = member
    this.player_number++
    return true
  }

  remove_player(member: Member): boolean {
    if (AVAILABLE_MEMBER_SENTINEL.id == member.id) {
      return false;
    }

    const to_remove_idx = this.players.findIndex((value, _idx, _arr) => (value.id === member.id))

    if (to_remove_idx === -1) {
      return false
    }

    this.players[to_remove_idx] = AVAILABLE_MEMBER_SENTINEL
    this.player_number--
    return true
  }
}

export { TTRPGTableModel }
