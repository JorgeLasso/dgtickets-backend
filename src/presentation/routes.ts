import { Router } from "express";
import { CountryRoutes } from "./countries/routes";
import { TicketRoutes } from "./tickets/routes";


export class AppRoutes {


    static get routes(): Router {
        const router = Router();

        router.use( '/api/countries', CountryRoutes.routes );

        router.use( '/api/tickets', TicketRoutes.routes );




        return router;
    }

}