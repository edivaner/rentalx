import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new AppError("Token missing", 401);

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "6e6781157579315c75b07e7a5d5b712a") as IPayload
        // console.log(sub);

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id)

        if (!user)
            throw new AppError("User does not exists!", 401);

        request.user = {
            id: user_id
        }

        next();
    } catch {
        throw new AppError("Invalid Token!", 401);
    }
}