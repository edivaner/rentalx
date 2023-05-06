import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsProvider")
        private dateProvider: IDateProvider,
        @inject("CarRepository")
        private carRepository: ICarsRepository,
    ) { }

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        const minimumHoursAtRental = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUSer = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUSer) {
            throw new AppError("There's a rental in progress for user.");
        }

        const dateNow = this.dateProvider.dateNow();
        const compareDate = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if (compareDate < minimumHoursAtRental) {
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        await this.carRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase }