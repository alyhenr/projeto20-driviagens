export default (passengersServices) => {
    return {
        create,
        readTravels
    }

    async function create(req, res) {
        const { firstName, lastName } = req.body;

        await passengersServices.create({ firstName, lastName });
        res.sendStatus(201);
    }

    async function readTravels(req, res) {
        const { name } = req.query;

        const travels = await passengersServices.readTravels({ name });
        res.status(200).send(travels);
    }
}