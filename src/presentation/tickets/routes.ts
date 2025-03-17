import { Router } from "express";
import { TicketController } from "./controller";

export class TicketRoutes {
    static get routes() {
        const router = Router();
        const ticketController = new TicketController();
        router.get('/', ticketController.getTickets);
        router.get('/last', ticketController.getLastTicket);
        router.get('/pending', ticketController.pendingTickets);

        router.post('/', ticketController.createTicket);

        router.get('/draw/:module', ticketController.drawTicket);

        router.put('/done/:ticketId', ticketController.ticketFinished);

        router.get('/working-on', ticketController.workingOn);

        return router;
    }
}