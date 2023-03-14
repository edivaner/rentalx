import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesrepository";

class CategoryRepositoryInMemory implements ICategoriesRepository {

    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category) => category.name == name);
        return category;
    }

    async list(): Promise<Category[]> {
        const category = this.categories
        return category
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = new Category();

        Object.assign(category, { name, description });

        this.categories.push(category);

        return category
    }
}

export { CategoryRepositoryInMemory }