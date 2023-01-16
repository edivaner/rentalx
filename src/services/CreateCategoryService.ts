
import { ICategoriesRepository } from "../repositories/ICategoriesrepository";

interface IRequest {
    name: string,
    description: string
}

class CreateCategoryService {
    constructor(private categoryRepositories: ICategoriesRepository) { }

    execute({ name, description }: IRequest) {
        const CategoryAlreadyExists = this.categoryRepositories.findByName(name);

        if (CategoryAlreadyExists)
            throw new Error("Category already exists!");

        const retorno = this.categoryRepositories.create({ name, description });

        return retorno;
    }
}

export { CreateCategoryService }