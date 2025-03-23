import { Router } from "express";
import { CountryRoutes } from "./countries/routes";
import { TicketRoutes } from "./tickets/routes";
import { AuthRoutes } from "./Auth/routes";


export class AppRoutes {


    static get routes(): Router {
        const router = Router();

        router.use( '/api/countries', CountryRoutes.routes );

        router.use( '/api/tickets', TicketRoutes.routes );

        router.use('/api/auth', AuthRoutes.routes );




        return router;
    }

}