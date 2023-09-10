export default (citiesService) => {
    return {
        create,
    }

    async function create(req, res) {
        const { name } = req.body;

        await citiesService.create(name);
        res.sendStatus(201);
    }
}