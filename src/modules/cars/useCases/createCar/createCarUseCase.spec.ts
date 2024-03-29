import { CreateCarUseCase } from "./createCarUseCase";
import { CreateCarsRepositoryInMemory } from "../../repositories/in-memory/CreateCarsRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let createCarsRepositoryInMemory: CreateCarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        createCarsRepositoryInMemory = new CreateCarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(createCarsRepositoryInMemory);
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        expect(car).toHaveProperty("id");
    })

    it("should not be able to create a car with exists license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car 1",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            });

            await createCarUseCase.execute({
                name: "Car 2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Availabke",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        expect(car.available).toBe(true);
    });


})