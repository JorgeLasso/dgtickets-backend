import { Request, Response } from "express";
import { prisma } from "../../data/postgres";


export class CountriesController {


    constructor(){}

    public getCountries = async (req: Request, res: Response) => {


        const countries = await prisma.country.findMany();
        res.json(countries);
        return;

    }

    public getCountryById = async (req: Request, res: Response) => {
        const id = +req.params.id;


        
        if( !id ) {
            res.status(400).json({ error: `Id property is required` })
            return;
        }
        
        if( isNaN(id) ) {
            res.status(400).json({ error: `${id} is not a number` })
            return;
        }
        
        const country = await prisma.country.findFirst({ where: { id } });

        res.json(country);
        return;
    }

    public createCountry = async (req: Request, res: Response) => {
        const { name, image } = req.body;
        if( !name ) {
            res.status(400).json({ error: `Name property is required` })
            return;
        }

        if( !image ) {
            res.status(400).json({ error: `Image property is required` })
            return;
        }

        const country = await prisma.country.create({
            data: {
                name,
                image
            }
        })

        res.json( country )


    }
}