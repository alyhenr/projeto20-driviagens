import errors from "../errors/errors.js";

export function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) throw errors.unprocessableEntity(error.details.map((e) => e.message));

        next();
    };
}
