export interface Ticket {
  id: string,
  number: number,
  createdAt: Date,
  handleAtModule?: string,
  HandleAt?: Date,
  done: boolean,
}