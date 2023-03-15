import { ICreateUsersTDO } from "../dtos/ICreateUSerDTO"
import { User } from "../infra/typeorm/entities/User"

interface IUserRepository {
    create({ name, email, password, driver_license }: ICreateUsersTDO): Promise<void>
    findByEmail(email: String): Promise<User>
    findById(id: String): Promise<User>
}

export { IUserRepository }