import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import passengerSchema from "../schemas/passengerSchema.js";

//Dependencies
import { db } from "../database/dbConnection.js";
import PostgresDB from "../database/postgresDB.js";

import createPassengersRepositories from "../repositories/passengersRepositories.js";
import createPassengersService from "../services/passengersServices.js";
import createPassengersController from "../controllers/passengersController.js";

const passengersRoutes = Router();

//Instantiate a postgres database class
const postgresDB = new PostgresDB(db.postgres, "passengers");

const passengersRepositories = createPassengersRepositories(postgresDB);
const passengersServices = createPassengersService(passengersRepositories);
const passengersController = createPassengersController(passengersServices);

passengersRoutes.post("/passengers", validateSchema(passengerSchema), passengersController.create);
passengersRoutes.get("/passengers/travels", passengersController.travels);

export default passengersRoutes;