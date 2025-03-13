import { Request, Response, Router } from "express";
import { CountriesController } from "./controller";



export class CountryRoutes {


    static get routes(): Router {
        const router = Router();
        const countryController = new CountriesController();

        router.get( '/', countryController.getCountries );
        router.get( '/:id', countryController.getCountryById );
        router.post( '/', countryController.createCountry );




        return router;
    }

}