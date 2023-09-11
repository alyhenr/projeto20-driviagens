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
        const {
            origin,
            destination,
        } = req.query;
        const smallerDate = req.query["smaller-date"];
        const biggerDate = req.query["bigger-date"];

        const data = {
            origin, destination, smallerDate, biggerDate
        };
        ["origin", "destination", "smallerDate", "biggerDate"]
            .forEach(info => {
                if (data[info] === undefined) {
                    delete data[info];
                }
            });


        const flights = await flightsService.read(data);
        res.status(200).send(flights);
    }
}