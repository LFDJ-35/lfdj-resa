import { v4 } from 'uuid'
import { Member } from './member'

type CarpoolWhen = 'Après-midi' | 'Soirée'

interface ICarpool {
  driver: Member
  from: string
  when: CarpoolWhen
  passengers: Member[]
  max_passengers: number
  id: string

  canAddPassenger(): boolean
  addPassenger(passenger: Member | null): void
  removePassenger(passenger: Member | null): void
  has(member: Member | null): boolean
}

class Carpool implements ICarpool {
  driver: Member
  from: string
  when: CarpoolWhen
  passengers: Member[]
  max_passengers: number
  id: string

  constructor(
    driver: Member,
    from: string,
    when: CarpoolWhen,
    passengers: Member[],
    maxPassengers: number,
    id: string | null = null
  ) {
    this.driver = driver
    this.from = from
    this.when = when
    this.passengers = passengers
    this.max_passengers = maxPassengers

    if (id === null) {
      this.id = v4();
    } else {
      this.id = id;
    }
  }

  has(member: Member | null): boolean {
    if (member === null) {
      return false
    }

    if (member === this.driver) {
      return true
    }

    return this.passengers.findIndex((value, _idx, _arr) => value.id === member.id) !== -1
  }

  canAddPassenger(): boolean {
    return this.passengers.length < this.max_passengers
  }

  addPassenger(passenger: Member | null): void {
    if (passenger === null || !this.canAddPassenger() || this.has(passenger)) {
      return
    }

    this.passengers.push(passenger)
  }

  removePassenger(passenger: Member): void {
    if (passenger === null) {
      return
    }

    const passengerIdx = this.passengers.findIndex((value, _idx, _arr) => value.id === passenger.id)
    if (passengerIdx === -1) {
      return
    }

    this.passengers.splice(passengerIdx, 1)
  }
}

export { type ICarpool, type CarpoolWhen, Carpool }
