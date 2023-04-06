import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";
import { CreateCarsRepositoryInMemory } from "../../repositories/in-memory/CreateCarsRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let createCarsRepositoryInMemory: CreateCarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("create car specification", () => {
    beforeEach(() => {
        createCarsRepositoryInMemory = new CreateCarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(createCarsRepositoryInMemory, specificationsRepositoryInMemory);
    })

    it("should not be able to add a new specification to  a no existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await createCarsRepositoryInMemory.create({
            name: "Car Availabke",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "teste"
        })
        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    })


});