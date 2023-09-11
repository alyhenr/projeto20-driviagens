import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import citiesSchema from "../schemas/citiesSchema.js";

//Dependencies
import { db } from "../database/dbConnection.js";
import PostgresDB from "../database/postgresDB.js";

import createCitiesRepositories from "../repositories/citiesRepositories.js";
import createCitiesService from "../services/citiesServices.js";
import createCitiesController from "../controllers/citiesController.js";

const citiesRoutes = Router();

//Instantiate a postgres database class
const postgresDB = new PostgresDB(db.postgres, "cities");

const citiesRepositories = createCitiesRepositories(postgresDB);
const citiesServices = createCitiesService(citiesRepositories);
const citiesController = createCitiesController(citiesServices);

citiesRoutes.post("/cities", validateSchema(citiesSchema), citiesController.create);

export default citiesRoutes;