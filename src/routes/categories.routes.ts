import { request, Router } from 'express';
import { Category } from '../model/Category';
import { CategoryRepositories } from '../repositories/CategoryRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoryRepositories = new CategoryRepositories();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(categoryRepositories);
    const retorno = createCategoryService.execute({ name, description });

    return response.status(201).json({ retorno }).send();
});

categoriesRoutes.get('/', (request, response) => {
    const all = categoryRepositories.list();

    return response.json(all);
})

export { categoriesRoutes };