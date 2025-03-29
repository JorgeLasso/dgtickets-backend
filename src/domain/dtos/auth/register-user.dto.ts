import { regularExps } from "../../../config";




export class RegisterUserDto {

    private constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public photo?: string
    ) {}

    static create( object: { [key: string]: any } ): [string?, RegisterUserDto?] {
        const { firstName, lastName, email, password, photo = '' } = object;

        if( !firstName ) return [ 'Missing name' ];
        if( !lastName ) return [ 'Missing name' ];
        if( !email ) return [ 'Missing email' ];
        if( !regularExps.email.test(email) ) return [ 'Email is not valid' ];
        if( !password ) return [ 'Missing password' ];
        if( password.length < 6 ) return [ 'Password must be at least 6 characters' ];

        return [undefined, new RegisterUserDto( firstName, lastName, email, password, photo )];
    }

}