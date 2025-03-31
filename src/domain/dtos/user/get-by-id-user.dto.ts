

export class GetUserByIdDto {

    private constructor(
        public readonly id: number,    
    ){}


    static create( id: number ): [string?, GetUserByIdDto?] {


        if( !id ) return [ 'Missing id' ];

        if( isNaN(id) ) return [ `${id} is not a number`];


        return [undefined, new GetUserByIdDto(id)];


    }

}