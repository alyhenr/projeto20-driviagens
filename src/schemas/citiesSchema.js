import Joi from "joi";

export default Joi.object({
    name: Joi.string().min(2).max(50).required(),
});