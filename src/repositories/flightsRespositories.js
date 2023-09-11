export default (db) => {
    return {
        create,
        read,
        findCities,
    }

    function create({ origin, destination, date }) {
        const newFlight = db.insert({ origin, destination, date });

        return {
            inserted: true,
            newFlight
        }
    }

    async function read(clauses = {}) {
        let baseQuery = `
            SELECT TO_CHAR(f.date::date, 'dd-mm-yyyy') as date, c1.name as origin, c2.name as destination
            from flights f
            JOIN cities c1 ON c1.id = f.origin
            JOIN cities c2 ON c2.id = f.destination
        `;
        const values = [];
        let count = 1;

        if (Object.keys(clauses).length) {
            baseQuery += ` WHERE (`;

            if (clauses.smallerDate && clauses.biggerDate) {
                baseQuery += `
                    date >= $${count}
                    AND date <= $${count + 1}
                `;
                values.push(...[clauses.smallerDate, clauses.biggerDate]);
                count += 2;
            }
            if (clauses.origin) {
                baseQuery += `
                    ${count > 1 ? "AND" : ""} c1.name = $${count}
                `;
                values.push(clauses.origin);
                count++;
            }
            if (clauses.destination) {
                baseQuery += `
                    ${count > 1 ? "AND" : ""} c2.name = $${count}
                `;
                values.push(clauses.destination)
            }

            baseQuery += `) ORDER BY date DESC;`;
        }

        return (await db.customQuery(baseQuery, values));
    }

    async function findCities({ id: [origin, destination] }) {
        db.useAnotherTable("cities");

        if (!(await db.find({ id: origin }))) {
            return {
                found: false,
                city: "Origin",
            }
        }

        if (!(await db.find({ id: destination }))) {
            return {
                found: false,
                city: "Destination",
            }
        }
        db.goBackToOriginalTable();
        return {
            found: true,
            city: "",
        };
    }

}