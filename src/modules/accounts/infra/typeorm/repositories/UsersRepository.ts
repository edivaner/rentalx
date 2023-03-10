import { getRepository, Repository } from "typeorm";
import { ICreateUsersTDO } from "../../../dtos/ICreateUSerDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../../../repositories/IUsersRepository";


class UsersRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, password, driver_license, id, avatar }: ICreateUsersTDO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
            id,
            avatar
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id });
        return user;
    }
}

export { UsersRepository }