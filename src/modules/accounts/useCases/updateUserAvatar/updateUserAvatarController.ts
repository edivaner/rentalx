import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase";


class UpdateUserAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        // REceber arquivo
        const avatar_file = request.file.filename;

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file: avatar_file })

        return response.status(204).send();
    }

}

export { UpdateUserAvatarController }