import { container } from "tsyringe"
import { CreateRentalUseCase } from "./createRentalUseCase";
import { Request, Response } from "express";



class CreateRentalController {

    async handle(request: Request, response: Response) {
        const { car_id, expected_return_date } = request.body;
        const { id } = request.user;
        const createRentalUseCase = container.resolve(CreateRentalUseCase);

        const rental = await createRentalUseCase.execute({
            car_id,
            user_id: id,
            expected_return_date
        });

        return response.json(rental).status(201);
    }
}

export { CreateRentalController }