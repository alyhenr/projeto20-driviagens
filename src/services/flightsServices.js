import dayjs from "dayjs";
import errors from "../errors/errors.js";
import formatDate from "../utils/formatDate.js";

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

        flightsRepositories.useAnotherTable("cities");

        //Check if cities exists
        if (!(await flightsRepositories.find({ id: origin }))) {
            throw errors.notFound("Origin");
        } else if (!(await flightsRepositories.find({ id: destination }))) {
            throw errors.notFound("Destination");
        }

        flightsRepositories.goBackToOriginalTable();

        flightsRepositories.create({ origin, destination, date });
    }

    async function read() {
        //TODO
    }
};