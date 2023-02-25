import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUseUseCase } from "./AuthenticateUseUseCase";



class AuthenticateUseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUseUseCase);

        const token = await authenticateUserUseCase.execute({ email, password })

        return response.json(token);
    }
}

export { AuthenticateUseController }