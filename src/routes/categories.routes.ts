import { request, Router } from 'express';
import { Category } from '../model/Category';
import { CategoryRepositories } from '../repositories/CategoryRepository';

const categoriesRoutes = Router();
const categoryRepositories = new CategoryRepositories();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const CategoryAlreadyExists = categoryRepositories.findByName(name);
    if (CategoryAlreadyExists)
        return response.status(400).json({
            error: "Category already"
        })

    const retorno = categoryRepositories.create({ name, description });

    return response.status(201).json({ retorno }).send();
});

categoriesRoutes.get('/', (request, response) => {
    const all = categoryRepositories.list();

    return response.json(all);
})

export { categoriesRoutes };