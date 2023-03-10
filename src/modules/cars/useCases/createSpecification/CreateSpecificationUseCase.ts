import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateSpecificationUseCase {
    constructor(@inject("SpecificationRepository") private specificationRepository: ISpecificationRepository) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationRepository.findByName(name);

        if (specificationAlreadyExists)
            throw new AppError("Specification already exists!", 401);

        await this.specificationRepository.create({
            name,
            description
        });

    }
}

export { CreateSpecificationUseCase }