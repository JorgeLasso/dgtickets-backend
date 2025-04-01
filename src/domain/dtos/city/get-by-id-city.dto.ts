

export class GetCityByIdDto {

    private constructor(
        public readonly id: number,    
    ){}


    static create( id: number ): [string?, GetCityByIdDto?] {


        if( !id ) return [ 'Missing id' ];

        if( isNaN(id) ) return [ `${id} is not a number`];


        return [undefined, new GetCityByIdDto(id)];


    }

}