export default (db) => {
    return {
        create,
    }

    async function create(name) {
        const newCity = await db.query(`
            INSERT INTO cities (name)
            VALUES ($1);
        `, [name]);

        return {
            inserted: true,
            newCity: newCity.rows[0],
        }
    }
}