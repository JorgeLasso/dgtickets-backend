

export class GetTicketByIdDto {

    private constructor(
        public readonly code: string,    
    ){}


    static create( code: string ): [string?, GetTicketByIdDto?] {


        if( !code ) return [ 'Missing code' ];


        return [undefined, new GetTicketByIdDto(code)];


    }

}