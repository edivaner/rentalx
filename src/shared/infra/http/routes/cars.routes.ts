import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";
import { ListCarsController } from "../../../../modules/cars/useCases/listCars/listCarsController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import { CreateCarspecificationController } from "../../../../modules/cars/useCases/createCarSpecification/createCarspecificationController";

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarsSpecificationController = new CreateCarspecificationController();

const carsRoutes = Router();

carsRoutes.post("/", ensureAuthenticate, ensureIsAdmin, createCarController.handle);

carsRoutes.get("/available", listCarsController.handle);

carsRoutes.post("/specifications/:id", ensureAuthenticate, ensureIsAdmin, createCarsSpecificationController.handle);

export { carsRoutes }