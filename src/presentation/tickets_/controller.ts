import { Request, Response } from "express";
import {
  CreateTicketDto,
  CreateUserDto,
  CustomError,
  GetTicketByIdDto,
  GetUserByIdDto,
  PaginationDto,
  UpdateTicketDto,
  UpdateUserDto,
} from "../../domain";

import { UserService } from "../services/user.service";
import { TicketService_ } from "../services/ticket_.service";

export class TicketsController_ {
  constructor(private readonly ticketService: TicketService_) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    console.log(`${error}`);
    res.status(500).json({ error: "Internal server error" });
    return;
  };

  public getTickets = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.ticketService
      .getTickets(paginationDto!)
      .then((tickets) => res.json(tickets))
      .catch((error) => this.handleError(error, res));
  };

  public getTicketById = async (req: Request, res: Response) => {
    const [error, getTicketByIdDto] = GetTicketByIdDto.create(req.params.code);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.ticketService
      .getTicketById(getTicketByIdDto!)
      .then((ticket) => res.status(201).json(ticket))
      .catch((error) => this.handleError(error, res));
  };

  createTicket = (req: Request, res: Response) => {
    const [error, createTicketDto] = CreateTicketDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.ticketService
      .createTicket(createTicketDto!)
      .then((ticket) => res.status(201).json(ticket))
      .catch((error) => this.handleError(error, res));
  };

  updateTicket = (req: Request, res: Response) => {
    const [error, updateTicketDto] = UpdateTicketDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.ticketService
      .updateTicket(updateTicketDto!)
      .then((ticket) => res.status(201).json(ticket))
      .catch((error) => this.handleError(error, res));
  };
}
