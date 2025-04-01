import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import { CustomError, LoginUserDto, RecoveryUserDto, RegisterUserDto, UpdatePasswordDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";



export class AuthService {

    constructor(
        private readonly emailService: EmailService
    ) {}

    public async registerUser( registerUserDto: RegisterUserDto ) {


        const existUser = await prisma.user.findFirst({ where: { email: registerUserDto.email } });

        if( existUser ) throw CustomError.badRequest('Email already exist');

        const existCity = await prisma.user.findFirst({ where: { cityId: +registerUserDto.cityId } });
        if( !existCity ) throw CustomError.badRequest('City not exist');


        try {
            const user = await prisma.user.create({
                data: {
                    firstName: registerUserDto.firstName,
                    lastName: registerUserDto.lastName,
                    email: registerUserDto.email,
                    password: bcryptAdapter.hash(registerUserDto.password),
                    photo: registerUserDto.photo,
                    cityId: +registerUserDto.cityId
                }
            })
        

            await this.sendEmailValiadtionLink( user.email );
            
            const userEntity = UserEntity.fromObject(user);

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

        if( !user.emailValidated ) throw CustomError.unauthorized('Email not activated');

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

    private sendEmailRecoveryLink = async( email: string ) => {

        const token = await JwtAdapter.generateToken({ email });
        if( !token  ) throw CustomError.internalServer('Error getting token');

        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;
        const html = `
            <h1>Recovery your password</h1>
            <p>Click on the following link to update your password</p>
            <a href="${ link }">Recovery your password: ${ email }</a>
        `;

        const options = {
            to: email,
            subject: 'Recovery your password',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail(options);
        if( !isSent ) throw CustomError.internalServer('Error sending email');

        return true;
    }

    public validateEmail = async ( token: string ) => {

        const payload = await JwtAdapter.validateToken(token);
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

    public recoveryPassword = async( recoveryUserDto: RecoveryUserDto ) => {

        const user = await prisma.user.findFirst({ where: { email: recoveryUserDto.email } });
        if( !user ) throw CustomError.badRequest('Email not exist');


        try {
        

            await this.sendEmailRecoveryLink( user.email );

            const { password, emailValidated, photo, userType, id, ...userEntity } = UserEntity.fromObject(user);

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

    public updatedPassword = async( updatePasswordDto: UpdatePasswordDto ) => {

        const user = await prisma.user.findFirst({ where: { email: updatePasswordDto.email } });
        if( !user ) throw CustomError.badRequest('Email not exist');

        const payload = await JwtAdapter.validateToken(updatePasswordDto.token);
        if( !payload ) throw CustomError.unauthorized('Invalid token');


        try {

            await prisma.user.update({
                where: { id: user.id },
                data: { password: bcryptAdapter.hash(updatePasswordDto.password) },
              });

              const userEntity = UserEntity.fromObject(user);
        

            return {
                user: userEntity
            }

        } catch(error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}