import errors from "../errors/errors.js";

export default (passengersRepositories) => {
    return {
        create,
        travels
    }

    async function create({ firstName, lastName }) {
        if (await passengersRepositories.find({ firstName, lastName })) { throw errors.conflict("Passenger"); }

        passengersRepositories.create({ firstName, lastName });
    }

    async function travels() {

    }
};