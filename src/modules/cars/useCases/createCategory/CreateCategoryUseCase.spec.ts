import { AppError } from "../../../../shared/errors/AppError";
import { CategoryRepositoryInMemory } from "../../repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("Should be able to create a new category", async () => {
        const category = {
            name: 'Carros Antigos',
            description: 'Carros classicos antigos'
        }
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const category = {
                name: 'Carros Antigos',
                description: 'Carros classicos antigos'
            }
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});