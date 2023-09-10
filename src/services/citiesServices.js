import errors from "../errors/errors.js";

export default (citiesRepositories) => {
    return {
        create,
    }

    async function create(name) {
        const response = await citiesRepositories.create(name);

        if (!newCity.success) {
            throw errors.conflict("City");
        }
    }
};