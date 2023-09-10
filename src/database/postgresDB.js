import queryValuesGenerator from "../utils/queryValuesGenerator.js";

export default class PostgresDB {
    #pgdb;
    #tableName;
    constructor(pgdb, tableName) {
        this.#pgdb = pgdb;
        this.#tableName = tableName
    }

    async insert(data = {}) {
        const {
            columnsArray,
            protectedValues,
            valuesArray
        } = queryValuesGenerator(data);

        const result = await this.#pgdb.query(`
            INSERT INTO ${this.#tableName}
            (${columnsArray.map(col => `"${col}"`).join(", ")}) VALUES
            (${protectedValues})
        `, valuesArray);
        return result.rows[0];
    }

    select(data = {}) {

    }

    async find(data = {}) {
        const {
            columnsArray,
            valuesArray
        } = queryValuesGenerator(data);

        const query = `
            SELECT 1 FROM "${this.#tableName}"
            WHERE (
                ${columnsArray
                .map((col, i) => `"${col}"=$${i + 1}`).join(" AND ")}
            );
        `;
        return (await this.#pgdb.query(query, valuesArray)).rowCount > 0;
    }
}