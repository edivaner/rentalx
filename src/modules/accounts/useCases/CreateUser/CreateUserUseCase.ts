import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUsersRepository";
import { ICreateUsersTDO } from "../../dtos/ICreateUSerDTO";
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) { }

    async excecute({ name, email, password, driver_license }: ICreateUsersTDO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists)
            throw new AppError("Users Already Exists!", 401);

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name, email, password: passwordHash, driver_license
        })
    }
}
export { CreateUserUseCase }