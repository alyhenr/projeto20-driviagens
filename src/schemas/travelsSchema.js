import Joi from "joi";

export default Joi.object({
    passengerId: Joi.number().positive().required(),
    flightId: Joi.number().positive().required(),
});