import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";
import { ListCarsController } from "../../../../modules/cars/useCases/listCars/listCarsController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import { CreateCarspecificationController } from "../../../../modules/cars/useCases/createCarSpecification/createCarspecificationController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController";

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarsSpecificationController = new CreateCarspecificationController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

const carsRoutes = Router();

carsRoutes.post("/", ensureAuthenticate, ensureIsAdmin, createCarController.handle);

carsRoutes.get("/available", listCarsController.handle);

carsRoutes.post("/specifications/:id", ensureAuthenticate, ensureIsAdmin, createCarsSpecificationController.handle);

carsRoutes.post("/images/:id", ensureAuthenticate, ensureIsAdmin, upload.array("images"), uploadCarImageController.handle);

export { carsRoutes }