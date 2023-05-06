import { DayjsProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateCarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CreateCarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "../../repositories/in-memory/rentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase"
import dayjs from "dayjs";

let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayjsProvider;
let createCarsRepositoryInMemory: CreateCarsRepositoryInMemory;
let rentalRepositoryInMemory: RentalRepositoryInMemory

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(2, "day").toDate();

    beforeEach(() => {
        rentalRepositoryInMemory = new RentalRepositoryInMemory();
        createCarsRepositoryInMemory = new CreateCarsRepositoryInMemory();
        dateProvider = new DayjsProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dateProvider, createCarsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
            const rental = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "131313",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "intest",
                expected_return_date: dayAdd24Hours,
            });
            const rental = await createRentalUseCase.execute({
                user_id: "321",
                car_id: "intest",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental with invalid return time", async () => {
        expect(async () => {
            const rental = await createRentalUseCase.execute({
                user_id: "321",
                car_id: "intest",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});