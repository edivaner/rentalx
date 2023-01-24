import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesrepository";


class ListCategoriesUseCase {
    constructor(private categoryRepositories: ICategoriesRepository) { }

    execute(): Category[] {
        const categories = this.categoryRepositories.list();
        return categories;
    }
}

export { ListCategoriesUseCase }