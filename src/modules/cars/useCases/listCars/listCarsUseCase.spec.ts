import { CreateCarsRepositoryInMemory } from "../../repositories/in-memory/CreateCarsRepositoryInMemory";
import { ListCarsUseCase } from "./listCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryMemory: CreateCarsRepositoryInMemory;

describe("list cars", () => {
    beforeEach(() => {
        carsRepositoryMemory = new CreateCarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryMemory.create({
            name: "Car 1",
            description: "Carro da fiat",
            daily_rate: 50,
            license_plate: "LUH256",
            fine_amount: 10,
            brand: "FIAT",
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryMemory.create({
            name: "Car 2",
            description: "Carro da toyota",
            daily_rate: 50,
            license_plate: "LUH256",
            fine_amount: 10,
            brand: "Toyota",
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({
            brand: "Toyota",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryMemory.create({
            name: "Car 3",
            description: "Carro da chevrolet",
            daily_rate: 50,
            license_plate: "LUH256",
            fine_amount: 10,
            brand: "chevrolet",
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute({
            name: "Car 3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by categoria", async () => {
        const car = await carsRepositoryMemory.create({
            name: "Car 4",
            description: "Carro da audi",
            daily_rate: 50,
            license_plate: "LUH256",
            fine_amount: 10,
            brand: "audi",
            category_id: "12345"
        });

        const cars = await listCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    })
})