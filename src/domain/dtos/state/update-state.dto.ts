

export class UpdateStateDto {

    private constructor(
        public readonly name: string,
        public readonly image: string        
    ){}


    static create( object: { [key: string]: any } ): [string?, UpdateStateDto?] {

        const { name, image = false } = object;

        if( !name ) return [ 'Missing name' ];
        if( !image ) return [ 'Missing image' ];


        return [undefined, new UpdateStateDto(name, image)];


    }

}