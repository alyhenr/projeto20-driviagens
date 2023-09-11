export default (flightsService) => {
    return {
        create,
        read
    }

    async function create(req, res) {
        const { origin, destination, date } = req.body;

        await flightsService.create({ origin, destination, date });
        res.sendStatus(201);
    }

    async function read(req, res) {
        //TODO
    }
}