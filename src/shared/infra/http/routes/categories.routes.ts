import { request, Router } from 'express';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';

import Multer from 'multer';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const categoriesRoutes = Router();

const upload = Multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", ensureAuthenticate, ensureIsAdmin, createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post("/import", ensureAuthenticate, ensureIsAdmin, importCategoryController.handle)

export { categoriesRoutes };