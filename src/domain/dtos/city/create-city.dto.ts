

export class CreateCityDto {

    private constructor(
        public readonly name: string,
        public readonly stateId: number,
        public readonly image?: string,       
    ){}


    static create( object: { [key: string]: any } ): [string?, CreateCityDto?] {

        const { name, stateId, image = '' } = object;

        if( !name ) return [ 'Missing name' ];
        if( !stateId ) return [ 'Missing state' ];
        if( isNaN(stateId) ) return [ `stateId is not a valid type`];
        if( !image ) return [ 'Missing image' ];


        return [undefined, new CreateCityDto(name, stateId, image)];


    }

}