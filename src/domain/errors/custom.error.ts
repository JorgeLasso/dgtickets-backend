

export class CustomError extends Error {

    private constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message);
    }


    static badRequest( messgae: string ) {
        return new CustomError(400, messgae);
    }

    static unauthorized( messgae: string ) {
        return new CustomError(401, messgae);
    }
    static forbidden( messgae: string ) {
        return new CustomError(403, messgae);
    }
    static notFound( messgae: string ) {
        return new CustomError(404, messgae);
    }
    static internalServer( messgae: string ) {
        return new CustomError(500, messgae);
    }

    

}