import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { Car } from "../../infra/typeorm/entities/Car";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository,
    ) {

    }


    async execute({ car_id, specifications_id }): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists)
            throw new AppError("Car does not exists!");

        const specification = await this.specificationsRepository.findByIds(specifications_id);

        if (!specification)
            throw new AppError("Specification does not exists!");

        carExists.specifications = specification;

        await this.carsRepository.create(carExists);

        return carExists;

    }
}

export { CreateCarSpecificationUseCase }