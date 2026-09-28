import { Member } from './member'
import { SessionEvent } from './event'

class TTRPGTableModel extends SessionEvent {
  max_players: number
  author: Member
  players: Member[]

  constructor(
    title: string,
    from_date: Date,
    to_date: Date,
    description: string,
    author: Member,
    players: Member[],
    max_players: number,
  ) {
    super(title, from_date, to_date, description)
    this.author = author
    this.max_players = max_players
    this.players = players
  }

  addPlayer(member: Member): boolean {

    if (!this.canInsertPlayer()) {
      return false;
    }

    this.players.push(member);
    return true
  }

  removePlayer(member: Member): boolean {
    const toRemoveIdx = this.players.findIndex((value, _idx, _arr) => (value.id === member.id))

    if (toRemoveIdx === -1) {
      return false
    }

    this.players.splice(toRemoveIdx, 1)
    return true
  }

  canInsertPlayer(): boolean {
    return (this.players.length < this.max_players);
  }

}

export { TTRPGTableModel }
