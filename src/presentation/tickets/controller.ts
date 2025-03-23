import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export class TicketController{
  //*DI - WssService
  constructor(
    private readonly ticketService = new TicketService()
  ){}

  public getTickets = async (req: Request, res: Response) => {
    const tickets = await this.ticketService.getTickets();
    res.status(201).json(tickets);
  }

  public getLastTicket = async (req: Request, res: Response) => { 
    const lastTicket = await this.ticketService.getLastTicketNumber();
    res.status(201).json(lastTicket);
  }

  public pendingTickets = async (req: Request, res: Response) => {
    const pendingTickets = await this.ticketService.getPendingTickets();
    res.status(201).json(pendingTickets);
  }

  public createTicket = async (req: Request, res: Response) => {
    const newTicket = await this.ticketService.createTicket();
    res.status(201).json(newTicket);
  }

  public drawTicket = async (req: Request, res: Response) => {
    const { module } = req.params;
    const ticket = await this.ticketService.drawTicket(module);
    res.status(201).json(ticket);
  }

  public ticketFinished = async (req: Request, res: Response) => {
    const { ticketId } = req.params;
   const ticket = await this.ticketService.onFinishedTicket(ticketId);
    res.status(201).json(ticket);
  }

  public workingOn = async (req: Request, res: Response) => {
    const workingOnTickets = await this.ticketService.getLastWorkingOnTickets();
    res.status(201).json(workingOnTickets);
  }
}