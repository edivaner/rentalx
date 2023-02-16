import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesrepository';
import { CategoryRepositories } from '../../modules/cars/repositories/implementations/CategoryRepository';

import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';

container.registerSingleton<ICategoriesRepository>(
    "CategoryRepositories", //Nome do container
    CategoryRepositories // Repositorio
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository", //Nome do container
    SpecificationRepository // Repositorio
);