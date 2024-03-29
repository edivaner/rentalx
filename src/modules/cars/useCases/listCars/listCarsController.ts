import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./listCarsUseCase";



class ListCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, category_id, name } = request.query;

        const listAvailableCarsUseCase = container.resolve(ListCarsUseCase);

        const cars = await listAvailableCarsUseCase.execute({
            brand: brand as string, category_id: category_id as string, name: name as string
        });

        return response.json(cars);
    }
}

export { ListCarsController }