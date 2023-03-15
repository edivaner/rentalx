import { ICreateUsersTDO } from "../../dtos/ICreateUSerDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUsersRepository";


class UsersRepositoryInMemory implements IUserRepository {
    users: User[] = [];

    async create({ name, email, password, driver_license }: ICreateUsersTDO): Promise<void> {
        const user = new User();

        Object.assign(user, { name, email, password, driver_license });

        this.users.push(user);
    }
    async findByEmail(email: String): Promise<User> {
        const user = this.users.find((u) => u.email == email)
        return user;
    }

    async findById(id: String): Promise<User> {
        return this.users.find((u) => u.id == id);
    }

}

export { UsersRepositoryInMemory }