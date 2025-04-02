import { Router } from "express";
import { CountryRoutes } from "./countries/routes";
import { TicketRoutes } from "./tickets/routes";
import { AuthRoutes } from "./Auth/routes";
import { AuthMiddlewre } from "./middlewares/auth.middleware";
import { StateRoutes } from "./states/routes";
import { UserRoutes } from "./users/router";
import { CityRoutes } from "./cities/routes";
import { HeadquarterRoutes } from "./headquarter/routes";
import { TicketRoutes_ } from "./tickets_/router";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use(
      "/api/countries",
      [AuthMiddlewre.validateJWT],
      CountryRoutes.routes
    );
    router.use(
      "/api/tickets",
      [AuthMiddlewre.validateJWT],
      TicketRoutes.routes
    );
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/states", [AuthMiddlewre.validateJWT], StateRoutes.routes);
    router.use("/api/users", [AuthMiddlewre.validateJWT], UserRoutes.routes);
    router.use("/api/cities", [AuthMiddlewre.validateJWT], CityRoutes.routes);
    router.use("/api/headquarters", HeadquarterRoutes.routes);
    router.use("/api/tickets_", TicketRoutes_.routes);

    return router;
  }
}
