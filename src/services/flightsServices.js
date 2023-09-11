import dayjs from "dayjs";

import errors from "../errors/errors.js";

import { queriesDateSchema } from "../schemas/flightsSchema.js";
import formatDate from "../utils/formatDate.js";

const checkDate = (date) => {
    const { error } = queriesDateSchema.validate(date, { abortEarly: false });
    if (error) throw errors.unprocessableEntity(error.details.map((e) => e.message));
}

export default (flightsRepositories) => {
    return {
        create,
        read
    }

    async function create({ origin, destination, date }) {
        const formattedDate = formatDate(date);

        if (origin === destination) {
            const conflictError = errors.conflict();
            conflictError.customMessage("Origin and destination must be different");
            throw conflictError;
        }

        if (dayjs().isAfter(dayjs(formattedDate))) {
            throw errors.unprocessableEntity("Date provided cannot be in the past")
        }

        //Check if cities exists
        const response = await flightsRepositories.findCities({ id: [origin, destination] });
        if (!response.found) {
            throw errors.notFound(response.city);
        }

        flightsRepositories.create({ origin, destination, date });
    }

    async function read(clauses = {}) {
        const {
            origin,
            destination,
            smallerDate,
            biggerDate,
        } = clauses;

        if (smallerDate && !biggerDate) {
            throw errors.unprocessableEntity("You need to provide a bigger-date too");
        }

        if (biggerDate && !smallerDate) {
            throw errors.unprocessableEntity("You need to provide a smaller-date too");
        }

        //If dates are provided, validate them
        if (smallerDate && biggerDate) {
            checkDate({ date: smallerDate });
            checkDate({ date: biggerDate });
            const date1 = formatDate(smallerDate);
            const date2 = formatDate(biggerDate);

            if (!dayjs(date2).isAfter(dayjs(date1))) {
                throw errors.badRequest("The bigger-date needs to be after the smaller-date");
            }
        }

        //Check for valid origin and destination before access the db
        if (origin === destination) {
            throw errors.badRequest("There's no flights with destination equals to its origin")
        }

        return flightsRepositories.read(clauses);
    }
};