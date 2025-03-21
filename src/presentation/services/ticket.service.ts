import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TicketService {
  public readonly _tickets: Ticket[] = [
    {
      id: UuidAdapter.v4(),
      number: 1,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 2,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 3,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 4,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.v4(),
      number: 5,
      createdAt: new Date(),
      done: false,
    },
  ];

  private readonly workingOnTickets: Ticket[] = [];

  public pendingTickets = async (req: Request, res: Response) => {
    const tickets = await prisma.ticketDemo.findMany({
      where: {
        handleAtModule: {
          not: null,
        },
        done: {
          not: false,
        },
      },
    });
    res.json(tickets);
    return;
  };

  public get lastWorkingOnTickets(): Ticket[] {
    return this.workingOnTickets.splice(0, 5);
  }

  public lastTicketNumber = async (req: Request, res: Response) => {
    const lastTicket = await prisma.ticketDemo.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    const lastTicketNumber = lastTicket ? lastTicket.number : 0;
    res.json(lastTicketNumber);
    return;
  };

  public createTicket = async (req: Request, res: Response) => {
    const { number } = req.body;

    const newTicket = await prisma.ticketDemo.create({
      data: {
        id: UuidAdapter.v4(),
        number,
        done: false,
      },
    });

    res.json(newTicket);
    return;
  };

  public drawTicket = async (req: Request, res: Response) => {
    const { module } = req.body;

    const ticket = await prisma.ticketDemo.findFirst({
      where: {
        handleAtModule: {
          not: null,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!ticket) {
      return { status: "error", message: "No tickets available" };
    }

    const updatedTicket = await prisma.ticketDemo.update({
      where: { id: ticket.id },
      data: {
        handleAtModule: module,
        handleAt: new Date(),
      },
    });

    res.json(updatedTicket);
    return;
  };

  public onFinishedTicket = async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await prisma.ticketDemo.findFirst({
      where: {
        id: ticketId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!ticket) return { status: "error", message: "Ticket not found" };

    const updatedTicket = await prisma.ticketDemo.update({
      where: { id: ticket.id },
      data: {
        done: true,
      },
    });

    res.json(updatedTicket);
    return;
  };
}
