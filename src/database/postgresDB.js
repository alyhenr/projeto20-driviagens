import queryValuesGenerator from "../utils/queryValuesGenerator.js";

export default class PostgresDB {
    #pgdb;
    #tableName;
    #usingAnotherTable = false;
    constructor(pgdb, tableName) {
        this.#pgdb = pgdb;
        this.#tableName = tableName
    }

    useAnotherTable(tableName) {
        if (!this.#usingAnotherTable) {
            this.originalTable = this.#tableName;
        }

        this.#tableName = tableName;
        this.#usingAnotherTable = true;
    }

    goBackToOriginalTable() {
        if (!this.originalTable) return;
        if (this.#tableName == this.originalTable) return;

        this.#tableName = this.originalTable
        this.#usingAnotherTable = false;
        delete this.originalTable;
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
            ON CONFLICT DO NOTHING;
        `, valuesArray);

        return {
            inserted: result.rowCount > 0,
            data
        };
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