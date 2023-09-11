import Joi from "joi";
import dayjs from "dayjs";

import formatDate from "../utils/formatDate.js";

const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

const dateValidator = (date, helpers) => {
    const formattedDate = formatDate(date);
    if (!dayjs(formattedDate).isValid()) {
        return helpers
            .message("This date is not valid! The expected format is DD/MM/YYYY")
    }
    // dayjs and Joi are not catching number of days
    // that are valid for some months but are not for
    // others, depending on the year, for example:
    // 30/02/2024 and 31/11/2024 are passing, a solution to catch those
    // (ref: https://www.geeksforgeeks.org/how-to-get-the-number-of-days-in-a-specified-month-using-javascript/):
    const arrDate = formattedDate.split("-");
    const days = daysInMonth(arrDate[0], arrDate[2]);
    if (days < Number(arrDate[1])) return helpers
        .message(`This month(${arrDate[0]}) has only ${days} days!`);

    return date;
};

export const queriesDateSchema = Joi.object({
    date: Joi.string().custom(dateValidator).required()
});

export default Joi.object({
    origin: Joi.number().positive().required(),
    destination: Joi.number().positive().required(),
    date: Joi.custom(dateValidator).required(),
});