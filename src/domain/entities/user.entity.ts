import { CustomError } from "../errors/custom.error";


export class UserEntity {

    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public userType: string[],
        public photo?: string,
    ) {}

    static fromObject( object: { [key: string]: any } ) {
        const {id, firstName, lastName, photo, userType, email, emailValidated, password } = object;


        // if( id ) {
        //     throw CustomError.badRequest('Missing id');
        // }

        if( !firstName ) throw CustomError.badRequest('Missing firstName');
        if( !lastName ) throw CustomError.badRequest('Missing lastName');
        if( !email ) throw CustomError.badRequest('Missing email');
        if( emailValidated === undefined) throw CustomError.badRequest('Missing emailValidated');
        if( !password ) throw CustomError.badRequest('Missing password');
        if( !userType ) throw CustomError.badRequest('Missing userType');

        return new UserEntity( id, firstName, lastName, email, emailValidated, password, userType, photo ); 

    }

}