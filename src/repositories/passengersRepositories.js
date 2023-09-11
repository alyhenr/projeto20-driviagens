export default (db) => {
    return {
        find,
        create,
        readTravels
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

    async function readTravels({ name }) {
        const columnsArr = [`CONCAT("firstName", ' ', "lastName") AS passenger`, `COUNT(travels.*)::INTEGER AS travels`];
        const clausesArr = [];
        const joinTables = {
            type: ["LEFT"],
            tables: ["travels"],
            on: ['travels."passengerId"=passengers.id']
        };
        const groupBy = ["firstName", "lastName"];

        if (name) {
            clausesArr.push(`
                "firstName" ILIKE '%${name}%'
                OR "lastName" ILIKE '%${name}%'
            `);
        }

        return db.select({
            columns: columnsArr,
            clauses: clausesArr,
            joinTables,
            groupBy
        })
    }

}