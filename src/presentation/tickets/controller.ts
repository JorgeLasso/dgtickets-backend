import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export class TicketController{
  //*DI - WssService
  constructor(
    private readonly ticketService = new TicketService()
  ){}

  public getTickets = async (req: Request, res: Response) => {
    res.json(this.ticketService._tickets);
  }

  public getLastTicket = async (req: Request, res: Response) => { 
    res.json(this.ticketService.lastTicketNumber);
  }

  public pendingTickets = async (req: Request, res: Response) => {
    res.json(this.ticketService.pendingTickets);
  }

  public createTicket = async (req: Request, res: Response) => {
    res.status(201).json(this.ticketService.createTicket());
  }

  public drawTicket = async (req: Request, res: Response) => {
    const { module } = req.params;
    res.json(this.ticketService.drawTicket(module));
  }

  public ticketFinished = async (req: Request, res: Response) => {
    const { ticketId } = req.params;
    res.json(this.ticketService.onFinishedTicket(ticketId));
  }

  public workingOn = async (req: Request, res: Response) => {
    res.json(this.ticketService.lastWorkingOnTickets);
  }
}