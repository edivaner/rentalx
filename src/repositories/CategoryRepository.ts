import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesrepository";


class CategoryRepositories implements ICategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ name, description }: ICreateCategoryDTO): Category {
        const category = new Category();

        Object.assign(category,
            {
                name,
                description,
                created_at: new Date()
            }
        );

        this.categories.push(category);

        return category;
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(cat => cat.name === name);

        return category;
    }
}

export { CategoryRepositories }