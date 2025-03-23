export interface Ticket {
  id: string,
  number: number,
  createdAt: Date,
  handleAtModule?: string | null,
  HandleAt?: Date,
  done: boolean,
}