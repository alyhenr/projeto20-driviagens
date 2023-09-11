import errors from "../errors/errors.js";

export default (citiesRepositories) => {
    return {
        create,
    }

    async function create({ cityName }) {
        const response = await citiesRepositories.create({ cityName });

        if (!response.inserted) {
            throw errors.conflict("City");
        }
    }
};