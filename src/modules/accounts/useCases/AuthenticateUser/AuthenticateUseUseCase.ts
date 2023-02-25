import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    userAlreadyExist: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUseUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const userAlreadyExist = await this.userRepository.findByEmail(email);

        if (!userAlreadyExist)
            throw new AppError("Email or password incorrect!", 401);

        const passwordMatch = await compare(password, userAlreadyExist.password);

        if (!passwordMatch)
            throw new AppError("Email or password incorrect!", 401);

        const token = sign({}, "6e6781157579315c75b07e7a5d5b712a", {
            subject: userAlreadyExist.id,
            expiresIn: '1d'
        });

        const tokenReturn: IResponse = {
            token,
            userAlreadyExist: {
                name: userAlreadyExist.name,
                email: userAlreadyExist.email
            }
        }

        return tokenReturn;

    }
}

export { AuthenticateUseUseCase }