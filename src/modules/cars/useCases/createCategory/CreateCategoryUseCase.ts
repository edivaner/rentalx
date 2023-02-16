
import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesrepository";

interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoryRepositories")
        private categoryRepositories: ICategoriesRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<Category> {
        const CategoryAlreadyExists = await this.categoryRepositories.findByName(name);

        if (CategoryAlreadyExists)
            throw new Error("Category already exists!");

        const retorno = this.categoryRepositories.create({ name, description });

        return retorno;
    }
}

export { CreateCategoryUseCase }