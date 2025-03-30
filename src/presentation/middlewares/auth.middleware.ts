import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserEntity } from "../../domain";
import { prisma } from "../../data/postgres";


export class AuthMiddlewre {


    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        
        const authorization = req.header('Authorization');
        if( !authorization ) {
            res.status(401).json({error: 'No token provided'});
            return;
        }
        if( !authorization.startsWith('Bearer ') ) {
            res.status(401).json({error: 'Invalid Bearer token'});
            return;
        }

        const token = authorization?.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if( !payload ) {
                res.status(401).json({error: 'Invalid token'});
                return
            }

            const user = await prisma.user.findFirst({ where: { id: +payload.id } });
            if( !user ) {
                res.status(401).json({error: 'Invalid token - user'});
                return;
            }

            req.body.user = UserEntity.fromObject(user);

            next();


        } catch(error) {

            console.log(error)
            res.json(500).json({ error: 'Internal server error' });
        }

    }


}