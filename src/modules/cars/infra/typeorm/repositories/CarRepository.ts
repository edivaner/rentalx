import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Category } from "../entities/Category";


class CarRepository implements ICarsRepository {
    private repositoryCar: Repository<Car>

    constructor() {
        this.repositoryCar = getRepository(Car);
    }

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
        const car = this.repositoryCar.create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id });
        await this.repositoryCar.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {

        const car = await this.repositoryCar.findOne({ license_plate });
        return car;
    }

}

export { CarRepository }