import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";

export class TicketService {
  public readonly _tickets: Ticket[] = [
    {
      id: UuidAdapter.v4(),
      number: 1,
      createdAt: new Date(),
      done: false
    },
    {
      id: UuidAdapter.v4(),
      number: 2,
      createdAt: new Date(),
      done: false
    },
    {
      id: UuidAdapter.v4(),
      number: 3,
      createdAt: new Date(),
      done: false
    },
    {
      id: UuidAdapter.v4(),
      number: 4,
      createdAt: new Date(),
      done: false
    },
    {
      id: UuidAdapter.v4(),
      number: 5,
      createdAt: new Date(),
      done: false
    },

  ];

  private readonly workingOnTickets: Ticket[] = [];

  public get pendingTickets(): Ticket[] {
    return this._tickets.filter(ticket => !ticket.handleAtModule && !ticket.done);
  }

  public get lastWorkingOnTickets(): Ticket[] {
    return this.workingOnTickets.splice(0, 5);
  }

  public get lastTicketNumber():number {
    return this._tickets.length > 0 ? this._tickets.at(-1)!.number : 0;
  }

  public createTicket() {
    const ticket: Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber + 1,
      createdAt: new Date(),
      done: false
    }
    this._tickets.push(ticket);
    return ticket;
  }

  public drawTicket(module: string) {
    const ticket = this._tickets.find(ticket => !ticket.handleAtModule);
    if(!ticket) {
      return { status: 'error' , message: 'No tickets available'};
    }
    ticket.handleAtModule = module;
    ticket.HandleAt = new Date();

    this.workingOnTickets.unshift({...ticket});

    return { status: 'success', ticket };
  }

  public onFinishedTicket(ticketId: string) {
    const ticket = this._tickets.find(ticket => ticket.id === ticketId);
    if(!ticket) return { status: 'error', message: 'Ticket not found' };
  
    this._tickets.map(ticket => {
      if(ticket.id === ticketId) {
        ticket.done = true;
      }
      return ticket;
    });

    return { status: 'success', ticket };
  }
}