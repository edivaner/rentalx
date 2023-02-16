import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesrepository";

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoryRepositories")
        private categoryRepositories: ICategoriesRepository) { }

    async execute(): Promise<Category[]> {
        const categories = await this.categoryRepositories.list();
        return categories;
    }
}

export { ListCategoriesUseCase }