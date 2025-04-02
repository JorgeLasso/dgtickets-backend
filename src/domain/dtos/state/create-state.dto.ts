

export class CreateStateDto {

    private constructor(
        public readonly name: string,
        public readonly image: string,        
        public readonly countryId: number,        
    ){}


    static create( object: { [key: string]: any } ): [string?, CreateStateDto?] {

        const { name, image = false, countryId } = object;

        if( !name ) return [ 'Missing name' ];
        if( !countryId ) return [ 'Missing countryId' ];
        if( isNaN(countryId) ) return [ `countryId is not a valid type`];
        if( !image ) return [ 'Missing image' ];


        return [undefined, new CreateStateDto(name, image, countryId)];


    }

}