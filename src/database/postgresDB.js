import queryValuesGenerator from "../utils/queryValuesGenerator.js";

//Custom data base class to use postgres queries,
// aiming to generalize methods used in the repositories
// files, so that any db changes will require only
// a new class design with the db related queries
// and then update the dependency injection on the routes
// files.
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

    async select({ columns = "*", clauses = [], join = [] }) {
        //TODO
        if (join.length > 0) {
            return (await this.#pgdb.query(`
            
            `, [])).rows;
        } else {
            if (Object.keys(clauses).length > 0) {
                return (await this.#pgdb.query(`
                    SELECT (${columns
                        .map(col => `"${col}"`).join(", ")})
                    FROM "${this.#tableName}";
                `)).rows;
            } else {
                return (await this.#pgdb.query(`
                    SELECT (${columns
                        .map(col => `"${col}"`).join(", ")})
                    FROM "${this.#tableName}";
                `)).rows;
            }
        }

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

    async customQuery(query, values) {

        return (await this.#pgdb.query(query, values)).rows;
    }
}