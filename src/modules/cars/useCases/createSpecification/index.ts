
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreatSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


const specificationRepository = new SpecificationRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
const createSpecificationController = new CreatSpecificationController(createSpecificationUseCase);

export { createSpecificationController }