import Joi from "joi";
import dayjs from "dayjs";

import formatDate from "../utils/formatDate.js";

export default Joi.object({
    origin: Joi.number().required(),
    destination: Joi.number().required(),
    date: Joi.string().custom((date, helpers) => {
        const formattedDate = formatDate(date);

        if (!dayjs(formattedDate).isValid()) {
            return helpers
                .message("This date is not valid! The expected format is DD/MM/YYYY")
        }

        return date;
    }).required()
});