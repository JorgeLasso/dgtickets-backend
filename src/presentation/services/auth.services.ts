import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";



export class AuthService {

    constructor(
        private readonly emailService: EmailService
    ) {}

    public async registerUser( registerUserDto: RegisterUserDto ) {


        const existUser = await prisma.user.findFirst({ where: { email: registerUserDto.email } });

        if( existUser ) throw CustomError.badRequest('Email already exist');


        try {
            const user = await prisma.user.create({
                data: {
                    firstName: registerUserDto.firstName,
                    lastName: registerUserDto.lastName,
                    email: registerUserDto.email,
                    password: bcryptAdapter.hash(registerUserDto.password),
                    photo: registerUserDto.photo
                }
            })
        

            await this.sendEmailValiadtionLink( user.email );
           
            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({ id: user.id });
            if( !token ) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: userEntity,
                token
            }

        } catch(error) {
            throw CustomError.internalServer(`${error}`);
        }


    }

    public async loginUser( loginUserDto: LoginUserDto ) {


        const user = await prisma.user.findFirst({ where: { email: loginUserDto.email } });
        if( !user ) throw CustomError.badRequest('Email not exist');

        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);
        if( !isMatching ) throw CustomError.badRequest('Password is not valid');

        // const { userEntity } = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
        if( !token ) throw CustomError.internalServer('Error while creating JWT');


        return {
            token: token
        }


    }

    private sendEmailValiadtionLink = async( email: string ) => {

        const token = await JwtAdapter.generateToken({ email });
        if( !token  ) throw CustomError.internalServer('Error getting token');

        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${ link }">Validate your email: ${ email }</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail(options);
        if( !isSent ) throw CustomError.internalServer('Error sending email');

        return true;
    }

    public validateEmail = async ( token: string ) => {

        const payload = await JwtAdapter.validateToekn(token);
        if( !payload ) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if(  !email ) throw CustomError.internalServer('Email not in token');

        const user = await prisma.user.findFirst({ where: { email } });
        if( !user ) throw CustomError.badRequest('Email not exist');


        await prisma.user.update({
            where: { id: user.id },
            data: { emailValidated: true },
          });


        return true;


    }
}