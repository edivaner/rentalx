import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";
import { ListCarsController } from "../../../../modules/cars/useCases/listCars/listCarsController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

const carsRoutes = Router();

carsRoutes.post("/", ensureAuthenticate, ensureIsAdmin, createCarController.handle);

carsRoutes.get("/available", listCarsController.handle);

export { carsRoutes }