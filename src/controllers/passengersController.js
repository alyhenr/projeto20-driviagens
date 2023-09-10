export default (passengersServices) => {
    return {
        create,
        travels
    }

    async function create(req, res) {
        const { firstName, lastName } = req.body;

        await passengersServices.create({ firstName, lastName });
        res.sendStatus(201);
    }

    async function travels(req, res) {
        //TODO
    }
}