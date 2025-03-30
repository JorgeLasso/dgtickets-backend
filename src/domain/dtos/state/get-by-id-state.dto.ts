

export class GetStateByIdDto {

    private constructor(
        public readonly id: number,    
    ){}


    static create( id: number ): [string?, GetStateByIdDto?] {


        if( !id ) return [ 'Missing id' ];

        if( isNaN(id) ) return [ `${id} is not a number`];


        return [undefined, new GetStateByIdDto(id)];


    }

}