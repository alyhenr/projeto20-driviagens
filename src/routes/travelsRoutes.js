import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import travelsSchema from "../schemas/travelsSchema.js";

//Dependencies
import { db } from "../database/dbConnection.js";
import PostgresDB from "../database/postgresDB.js";

import createTravelsRepositories from "../repositories/travelsRepositories.js";
import createTravelsService from "../services/travelsServices.js";
import createTravelsController from "../controllers/travelsController.js";

const travelsRoutes = Router();

//Instantiate a postgres database class
const postgresDB = new PostgresDB(db.postgres, "travels");

const travelsRepositories = createTravelsRepositories(postgresDB);
const travelsServices = createTravelsService(travelsRepositories);
const travelsController = createTravelsController(travelsServices);

travelsRoutes.post("/travels", validateSchema(travelsSchema), travelsController.create);

export default travelsRoutes;