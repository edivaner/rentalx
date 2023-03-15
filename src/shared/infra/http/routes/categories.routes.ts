import { request, Router } from 'express';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';

import Multer from 'multer';

const categoriesRoutes = Router();

const upload = Multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post("/import", importCategoryController.handle)

export { categoriesRoutes };