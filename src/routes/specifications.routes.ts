import { Router } from "express";
import { CreatSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRouter = Router();

const creatSpecificationController = new CreatSpecificationController();

specificationRouter.post("/", creatSpecificationController.handle);

export { specificationRouter }