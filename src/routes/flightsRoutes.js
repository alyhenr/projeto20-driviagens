import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import flightsSchema from "../schemas/flightsSchema.js";

//Dependencies
import { db } from "../database/dbConnection.js";
import PostgresDB from "../database/postgresDB.js";

import createFlightsRepositories from "../repositories/flightsRespositories.js";
import createFlightsService from "../services/flightsServices.js";
import createFlightsController from "../controllers/flightsController.js";

const flightsRoutes = Router();

//Instantiate a postgres database class
const postgresDB = new PostgresDB(db.postgres, "flights");

const flightsRepositories = createFlightsRepositories(postgresDB);
const flightsServices = createFlightsService(flightsRepositories);
const flightsController = createFlightsController(flightsServices);

flightsRoutes.post("/flights", validateSchema(flightsSchema), flightsController.create);
flightsRoutes.get("/flights", flightsController.read);

export default flightsRoutes;