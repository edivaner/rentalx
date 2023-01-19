import { request, Router } from 'express';
import { Category } from '../modules/cars/model/Category';
import { CategoryRepositories } from '../modules/cars/repositories/CategoryRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { CreateCategoryUseCase } from '../modules/cars/useCases/createCategory/CreateCategoryUseCase';

const categoriesRoutes = Router();
const categoryRepositories = new CategoryRepositories();

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
    const all = categoryRepositories.list();

    return response.json(all);
})

export { categoriesRoutes };