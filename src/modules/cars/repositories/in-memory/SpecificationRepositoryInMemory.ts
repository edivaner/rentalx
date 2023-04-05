import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";



class SpecificationRepositoryInMemory implements ISpecificationRepository {
    specifications: Specification[] = [];


    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description, name
        })
        this.specifications.push(specification);

        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((c) => c.name === name);
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((c) => ids.includes(c.id));

        return allSpecifications;
    }

}

export { SpecificationRepositoryInMemory }