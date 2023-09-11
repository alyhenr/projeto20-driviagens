export default (db) => {
    return {
        create,
        find,
        findPassenger,
        findFlight,
    }

    function create({ passengerId, flightId }) {
        return db.insert({ passengerId, flightId });
    }

    function find(data = {}) {
        return db.find(data);
    }

    async function findPassenger({ id: passengerId }) {
        db.useAnotherTable("passengers");

        const response = await db.find({ id: passengerId })
        db.goBackToOriginalTable();
        return response;
    }

    async function findFlight({ id: flightId }) {
        db.useAnotherTable("flights");

        const response = await db.find({ id: flightId })
        db.goBackToOriginalTable();
        return response;
    }
}