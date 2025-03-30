

export class GetCountryByIdDto {

    private constructor(
        public readonly id: number,    
    ){}


    static create( id: number ): [string?, GetCountryByIdDto?] {


        if( !id ) return [ 'Missing id' ];

        if( isNaN(id) ) return [ `${id} is not a number`];


        return [undefined, new GetCountryByIdDto(id)];


    }

}