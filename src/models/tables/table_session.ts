import { Member } from '@/models/member'
import { SessionEvent } from '@/models/event'

type TableType =
  'Jeu de rôle' | 'Jeu de figurines' | 'Jeu de cartes à collectionner' | 'Jeu de plateau' | null

class TableModel extends SessionEvent {
  max_players: number
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
    this.max_players = max_players
    this.players = players

    if (authorIsAPlayer) {
      this.max_players -= 1
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
    return this.players.length < this.max_players
  }
}

export { TableModel }
