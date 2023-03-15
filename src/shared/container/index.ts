import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesrepository';
import { CategoryRepositories } from '../../modules/cars/infra/typeorm/repositories/CategoryRepository';

import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';

import { IUserRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ICategoriesRepository>(
    "CategoryRepositories", //Nome do container
    CategoryRepositories // Repositorio
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository", //Nome do container
    SpecificationRepository // Repositorio
);

container.registerSingleton<IUserRepository>(
    "UsersRepository",
    UsersRepository
);