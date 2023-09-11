export default (db) => {
    return {
        create,
        find,
        useAnotherTable,
        goBackToOriginalTable,
    }

    function create({ origin, destination, date }) {
        return db.insert({ origin, destination, date });
    }

    function find(data = {}) {
        return db.find(data);
    }

    function useAnotherTable(tableName = "flights") {
        db.useAnotherTable(tableName);
    }

    function goBackToOriginalTable() {
        db.goBackToOriginalTable();
    }
}