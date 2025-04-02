import { regularExps } from "../../../config";




export class CreateUserDto {

    private constructor(
        public firstName: string,
        public lastName: string,
        public userType: number,
        public email: string,
        public password: string,
        public cityId: number,
        public photo?: string
    ) {}

    static create( object: { [key: string]: any } ): [string?, CreateUserDto?] {
        const { firstName, lastName, userType, email, password, cityId, photo = '' } = object;

        if( !firstName ) return [ 'Missing firstName' ];
        if( !lastName ) return [ 'Missing lastName' ];
        if( !email ) return [ 'Missing email' ];
        if( !regularExps.email.test(email) ) return [ 'Email is not valid' ];
        if( !password ) return [ 'Missing password' ];
        if( password.length < 6 ) return [ 'Password must be at least 6 characters' ];
        if( !cityId ) return [ 'Missing city' ];
        if( isNaN(cityId) ) return [ `cityId is not a valid type`];

    
        return [undefined, new CreateUserDto( firstName, lastName, userType, email, password, cityId, photo )];
    }

}