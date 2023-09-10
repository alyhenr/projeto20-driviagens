import { AppErrors } from "../errors/errors.js";

export default (error, req, res, next) => {
    // console.log(error);
    return (error instanceof AppErrors)
        ? res.status(error.status).send(error.message)
        : res.status(500).send("Something went wrong... Try again in a few seconds");
}
