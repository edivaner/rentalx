import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreatSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const specificationRouter = Router();

const creatSpecificationController = new CreatSpecificationController();

specificationRouter.use(ensureAuthenticate, ensureIsAdmin)
specificationRouter.post("/", creatSpecificationController.handle);

export { specificationRouter }