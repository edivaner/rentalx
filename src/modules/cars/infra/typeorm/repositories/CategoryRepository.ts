import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesrepository";
import { getRepository, Repository } from "typeorm";

class CategoryRepositories implements ICategoriesRepository {
    private repository: Repository<Category>

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category);
        return category;
    }

    async list(): Promise<Category[]> {
        const category = await this.repository.find();
        return category;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });

        return category;
    }
}

export { CategoryRepositories }