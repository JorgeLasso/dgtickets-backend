import { Request, Response } from "express";
import { CustomError, LoginUserDto, RecoveryUserDto, RegisterUserDto, UpdatePasswordDto } from "../../domain";
import { AuthService } from "../services/auth.services";



export class AuthController {


    // DI
    constructor(
        public readonly authService: AuthService,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
            res.status(error.statusCode).json({error: error.message});
            return;
        }

        console.log(`${ error }`);
        res.status(500).json({error: 'Internal server error'});
        return;
    }

    registerUser = ( req: Request, res: Response ) => {
        const [error, registerDto] = RegisterUserDto.create( req.body );
        if( error ) {
            res.status(400).json({error});
            return;
        }

        this.authService.registerUser( registerDto! )
            .then( (user) => res.json(user) )
            .catch( (error) => this.handleError(error, res) );



    }
    loginUser = ( req: Request, res: Response ) => {
        
        const [error, loginUserDto] = LoginUserDto.create( req.body );
        if( error ) {
            res.status(400).json({error});
            return;
        }

        this.authService.loginUser( loginUserDto! )
            .then( (user) => res.json(user) )
            .catch( (error) => this.handleError(error, res) );




    }
    validateEmail = ( req: Request, res: Response ) => {
        const { token } = req.params;
        this.authService.validateEmail( token )
            .then( () => res.json('Email validated') )
            .catch( (error) => this.handleError(error, res) );
    }

    recoveryPassword = ( req: Request, res: Response ) => {
        const [error, recoveryDto] = RecoveryUserDto.create( req.body );
        if( error ) {
            res.status(400).json({error});
            return;
        }

        this.authService.recoveryPassword( recoveryDto! )
            .then( (user) => res.json(user) )
            .catch( (error) => this.handleError(error, res) );
    }

    updatePassword = ( req: Request, res: Response ) => {
        
        const [error, updatePasswordDto] = UpdatePasswordDto.create( req.body );
        if( error ) {
            res.status(400).json({error});
            return;
        }

        this.authService.updatedPassword( updatePasswordDto! )
            .then( (user) => res.json(user) )
            .catch( (error) => this.handleError(error, res) );
    }



}