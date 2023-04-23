import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationRouter } from "./specifications.routes";
import { usersRouter } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { rentalRoutes } from "./rental.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRouter);
router.use("/users", usersRouter);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);

router.use(authenticateRoutes);

export { router }



