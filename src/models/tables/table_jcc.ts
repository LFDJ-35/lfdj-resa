import { Member } from '@/models/member'
import { TableModel } from '@/models/tables/table_session'


class JCCTableModel extends TableModel {

  constructor(
    title: string,
    from_date: Date,
    to_date: Date,
    description: string,
    author: Member,
    players: Member[],
    max_players: number,
  ) {
    super(title, from_date, to_date, description, author, players, max_players, true)
    this.type = 'JCC'
  }
}

export { JCCTableModel }
