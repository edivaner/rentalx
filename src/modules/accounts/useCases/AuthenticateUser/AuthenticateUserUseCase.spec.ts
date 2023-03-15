import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUsersTDO } from "../../dtos/ICreateUSerDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUseUseCase } from "./AuthenticateUseUseCase"


let authenticateUserUserCase: AuthenticateUseUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUserCase = new AuthenticateUseUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })
    it("shouldbe able to authenticate an user", async () => {
        const user: ICreateUsersTDO = {
            name: "user test",
            email: "user@test.com",
            password: "1234",
            driver_license: "123456"
        }

        await createUserUseCase.excecute(user);

        const result = await authenticateUserUserCase.execute({
            email: user.email, password: user.password
        })

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserUserCase.execute({
                email: "false@email.com", password: "temquedarerro"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUsersTDO = {
                name: "user test error",
                email: "user@user.com",
                password: "12345",
                driver_license: "123456"
            }

            await createUserUseCase.excecute(user);

            await authenticateUserUserCase.execute({
                email: user.email,
                password: 'incorrectPassword'
            });
        }).rejects.toBeInstanceOf(AppError);
    })
})