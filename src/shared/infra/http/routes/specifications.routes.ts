import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreatSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRouter = Router();

const creatSpecificationController = new CreatSpecificationController();

specificationRouter.use(ensureAuthenticate)
specificationRouter.post("/", creatSpecificationController.handle);

export { specificationRouter }