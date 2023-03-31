import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/entities/Car";
import { CarRepository } from "../../infra/typeorm/repositories/CarRepository"
import { ICarsRepository } from "../../repositories/ICarsRepository"

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListCarsUseCase {
    constructor(
        @inject("CarRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const carsRepository = await this.carsRepository.findAvailable(brand, category_id, name);
        return carsRepository;
    }
}

export { ListCarsUseCase }