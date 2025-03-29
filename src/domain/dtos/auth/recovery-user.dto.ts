import { regularExps } from "../../../config";




export class RecoveryUserDto {

    private constructor(
        public email: string,
    ) {}


    static create( object: { [key: string]: any } ): [string?, RecoveryUserDto?] {
        const { email } = object;

        if( !email ) return [ 'Missing email' ];
        if( !regularExps.email.test(email) ) return [ 'Email is not valid' ];

        return [undefined, new RecoveryUserDto( email )];
    }

}