import { Router } from "express";
import { AuthenticateUseController } from "../../../../modules/accounts/useCases/AuthenticateUser/AuthenticateUseController";

const authenticateRoutes = Router();

const authenticateUseController = new AuthenticateUseController();

authenticateRoutes.post("/session", authenticateUseController.handle)

export { authenticateRoutes }