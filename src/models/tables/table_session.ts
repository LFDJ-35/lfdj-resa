import { Member } from '@/models/member'
import { SessionEvent } from '@/models/event'
import type { GameType } from '@/models/games'

type TableType = GameType | null

class TableModel extends SessionEvent {
  maxPlayers: number
  author: Member
  players: Member[]
  type: TableType = null
  authorIsAPlayer: boolean = false

  constructor(
    title: string,
    from_date: Date,
    to_date: Date,
    description: string,
    author: Member,
    players: Member[],
    max_players: number,
    authorIsAPlayer: boolean = false,
  ) {
    super(title, from_date, to_date, description)
    this.author = author
    this.maxPlayers = max_players
    this.players = players

    if (authorIsAPlayer) {
      this.maxPlayers -= 1
    }
  }

  addPlayer(member: Member): boolean {
    if (!this.canInsertPlayer()) {
      return false
    }

    this.players.push(member)
    return true
  }

  removePlayer(member: Member): boolean {
    const toRemoveIdx = this.players.findIndex((value) => value.id === member.id)

    if (toRemoveIdx === -1) {
      return false
    }

    this.players.splice(toRemoveIdx, 1)
    return true
  }

  canInsertPlayer(): boolean {
    return this.players.length < this.maxPlayers
  }
}

export { TableModel }
