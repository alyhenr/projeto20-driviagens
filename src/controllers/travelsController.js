export default (flightsService) => {
    return {
        create,
    }

    async function create(req, res) {
        const { passengerId, flightId } = req.body;

        await flightsService.create({ passengerId, flightId });

        res.sendStatus(201);
    }
}