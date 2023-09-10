export default (db) => {
    return {
        find,
        create,
        travels
    }

    function find(data) {
        return db.find(data);
    }

    function create({ firstName, lastName }) {
        const newPassenger = db.insert({ firstName, lastName });

        return {
            inserted: true,
            newPassenger,
        }
    }

    async function travels(firstName, lastName) {

    }

}