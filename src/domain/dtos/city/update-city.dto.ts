

export class UpdateCityDto {

    private constructor(
        public readonly name: string,
        public readonly image: string        
    ){}


    static create( object: { [key: string]: any } ): [string?, UpdateCityDto?] {

        const { name, image = false } = object;

        if( !name ) return [ 'Missing name' ];
        if( !image ) return [ 'Missing image' ];


        return [undefined, new UpdateCityDto(name, image)];


    }

}