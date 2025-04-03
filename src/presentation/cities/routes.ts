import { Router } from "express";
import { CitiesController } from "./controller";
import { CityService } from "../services/city.service";
import { AuthMiddlewre } from "../middlewares/auth.middleware";



export class CityRoutes {


    static get routes(): Router {
        const router = Router();
        const cityService = new CityService();
        const cityController = new CitiesController( cityService );

        router.get( '/', cityController.getCities );
        router.get( '/:id', cityController.getCityById );
        router.post( '/', [AuthMiddlewre.validateJWT], cityController.createCity );
        router.put( '/',[AuthMiddlewre.validateJWT], cityController.updateCity );




        return router;
    }

}