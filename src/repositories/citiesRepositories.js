export default (db) => {
    return {
        create,
    }

    function create({ cityName }) {
        return db.insert({ name: cityName })
    }
}