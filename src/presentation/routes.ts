import { Router } from "express";
import { CountryRoutes } from "./countries/routes";
import { TicketRoutes } from "./tickets/routes";
import { AuthRoutes } from "./Auth/routes";
import { AuthMiddlewre } from "./middlewares/auth.middleware";
import { StateRoutes } from "./states/routes";


export class AppRoutes {


    static get routes(): Router {
        const router = Router();

        router.use( '/api/countries', CountryRoutes.routes );

        router.use( '/api/tickets', [ AuthMiddlewre.validateJWT ], TicketRoutes.routes );

        router.use('/api/auth', AuthRoutes.routes );
        router.use('/api/states', StateRoutes.routes );




        return router;
    }

}