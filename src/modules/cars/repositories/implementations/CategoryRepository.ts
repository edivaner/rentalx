import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesrepository";

class CategoryRepositories implements ICategoriesRepository {
    private categories: Category[];

    private static INSTANCE: CategoryRepositories

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoryRepositories {
        if (!CategoryRepositories.INSTANCE) {
            CategoryRepositories.INSTANCE = new CategoryRepositories();
        }

        return CategoryRepositories.INSTANCE;
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