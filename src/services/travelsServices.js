import errors from "../errors/errors.js";

export default (travelsRepositories) => {
    return {
        create,
    }

    async function create({ passengerId, flightId }) {
        //Check if passenger exists
        travelsRepositories.useAnotherTable("passengers");
        if (!(await travelsRepositories.find({ id: passengerId }))) {
            throw errors.notFound("Passenger");
        }
        //Check if flight exists
        travelsRepositories.useAnotherTable("flights");
        if (!(await travelsRepositories.find({ id: flightId }))) {
            throw errors.notFound("Flight");
        }

        //Check if passenger alreay booked this flight
        travelsRepositories.goBackToOriginalTable();
        if (await travelsRepositories.find({
            passengerId, flightId
        })) {
            const conflictError = errors.conflict();
            conflictError.customMessage("Passenger already booked this flight");
            throw conflictError;
        }

        travelsRepositories.create({ passengerId, flightId });
    }
};