export default (db) => {
    return {
        create,
        find,
        useAnotherTable,
        goBackToOriginalTable,
    }

    function create({ passengerId, flightId }) {
        return db.insert({ passengerId, flightId });
    }

    function find(data = {}) {
        return db.find(data);
    }

    function useAnotherTable(tableName = "travels") {
        db.useAnotherTable(tableName);
    }

    function goBackToOriginalTable() {
        db.goBackToOriginalTable();
    }
}