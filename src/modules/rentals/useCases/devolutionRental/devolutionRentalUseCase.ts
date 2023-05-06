import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { Rental } from "../../infra/typeorm/entities/Rental";


interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const minimum_daily = 1;
        let total = 0;

        if (!rental) {
            throw new AppError("Rental does not exists!");
        }
        const car = await this.carsRepository.findById(rental.car_id);

        // verificar tempo de aluguel 
        const dateNow = this.dateProvider.dateNow();
        let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow()); // qts diarias o aluguel tem
        if (daily <= 0) daily = minimum_daily; // diarias minimas = 1 
        const delay = this.dateProvider.compareInHours(dateNow, rental.expected_return_date); // qtd de atrasos


        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += delay * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase }