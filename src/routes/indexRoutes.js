import { Router } from "express";
import passengersRoutes from "./passengersRoutes.js";


const indexRouter = Router();

indexRouter.use(passengersRoutes);

export default indexRouter;