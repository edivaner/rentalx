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

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = this.repositoryCar.create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id });
        await this.repositoryCar.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {

        const car = await this.repositoryCar.findOne({ license_plate });
        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repositoryCar
            .createQueryBuilder("c")
            .where("available = :available", { available: true });
        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand: brand });
        }
        if (category_id) {
            carsQuery.andWhere("c.category_id = :category", { category: category_id });
        }
        if (name) {
            carsQuery.andWhere("c.name = :name", { name: name });
        }

        const cars = await carsQuery.getMany();
        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repositoryCar.findOne(id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repositoryCar.createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }

}

export { CarRepository }