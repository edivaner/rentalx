import { Category } from "../model/Category";
import { ICategoriesRepository } from "./ICategoriesrepository";



class PostgresCategoriesRepository implements ICategoriesRepository {
    findByName(name: string): Category {
        throw new Error("Method not implemented.");
    }
    list(): Category[] {
        throw new Error("Method not implemented.");
    }
    create({ name, description }): Category {
        throw new Error("Method not implemented.");
    }

}

export { PostgresCategoriesRepository }