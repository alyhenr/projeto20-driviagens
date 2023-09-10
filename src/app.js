import express, { json } from "express";
import "express-async-errors";

import cors from "cors";

import indexRouter from "./routes/indexRoutes.js";
import errorsMiddleware from "./middlewares/errorsMiddleware.js";

const app = express();
app.use(cors());
app.use(json());

app.use(indexRouter);
app.use(errorsMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is firing! -> Port:${port}`));