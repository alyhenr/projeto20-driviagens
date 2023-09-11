import { Router } from "express";

import passengersRoutes from "./passengersRoutes.js";
import citiesRoutes from "./citiesRoutes.js";
import flightsRoutes from "./flightsRoutes.js";


const indexRouter = Router();

indexRouter.use(passengersRoutes);
indexRouter.use(citiesRoutes);
indexRouter.use(flightsRoutes);

export default indexRouter;