import errors from "../errors/errors.js";

export default (passengersRepositories) => {
    return {
        create,
        readTravels
    }

    async function create({ firstName, lastName }) {
        if (await passengersRepositories.find({ firstName, lastName })) { throw errors.conflict("Passenger"); }

        passengersRepositories.create({ firstName, lastName });
    }

    async function readTravels({ name = undefined }) {
        const reponse = await passengersRepositories.readTravels({ name });

        if (reponse.length > 10) {
            throw errors.internalServer("Too many results");
        }
        return reponse;
    }
};