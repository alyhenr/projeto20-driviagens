import { Router } from "express";

import passengersRoutes from "./passengersRoutes.js";
import citiesRoutes from "./citiesRoutes.js";
import flightsRoutes from "./flightsRoutes.js";
import travelsRoutes from "./travelsRoutes.js";


const indexRouter = Router();

indexRouter.use(passengersRoutes);
indexRouter.use(citiesRoutes);
indexRouter.use(flightsRoutes);
indexRouter.use(travelsRoutes);

export default indexRouter;