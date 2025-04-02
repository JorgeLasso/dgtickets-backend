

export class UpdateHeadquarterDto {

    private constructor(
        public readonly name: string,
        public readonly address: string,
        public readonly phoneNumber: string,
        public readonly isActive: boolean,
    ){}


    static create( object: { [key: string]: any } ): [string?, UpdateHeadquarterDto?] {

        const { name, address, phoneNumber, isActive } = object;

        if( !name ) return [ 'Missing name' ];
        if( !address ) return [ 'Missing address' ];
        if( !phoneNumber ) return [ 'Missing phoneNumber' ];
        if( !isActive ) return [ 'Missing isActive' ];
        if( typeof !!isActive !==  'boolean') return [ 'isActive is not a valid type' ];


        return [undefined, new UpdateHeadquarterDto(name, address, phoneNumber, isActive)];


    }

}