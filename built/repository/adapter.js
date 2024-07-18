var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { format } from "node-pg-format";
import { Ops } from "../types/dbAdapter";
export default class PgAdapter {
    constructor(pool, tableName) {
        this.name = () => this.tableName;
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            const fmt = format("INSERT INTO %I (%I) VALUES (%L) RETURNING *", this.tableName, Object.keys(data), Object.values(data));
            console.log("Create fmt:\n", fmt);
            const result = yield this.pool.query(fmt);
            return result.rows[0];
        });
        this.read = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
            return result.rows[0];
        });
        this.update = (id, data) => __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(data);
            const result = yield this.pool.query(`UPDATE ${this.tableName} SET ${keys
                .map((k, idx) => `${k} = $${idx + 2}`)
                .join(", ")}
          WHERE id = $1 RETURNING *`, [id, ...Object.values(data)]);
            return result.rows[0];
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`, [id]);
            return result.rows[0];
        });
        this.find = (filters) => __awaiter(this, void 0, void 0, function* () {
            const where = filters
                .map((filter) => {
                switch (filter.operator) {
                    case Ops.eq:
                        return "%I = %L";
                    default:
                        return "";
                }
            })
                .join(" AND ");
            const query = `SELECT * FROM ${this.tableName} ${where ? `WHERE ${where}` : ""}`;
            const values = filters.flatMap((filter) => [filter.field, filter.value]);
            const result = yield this.pool.query(format(query, ...values));
            return result.rows;
        });
        this.all = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query(`SELECT * FROM ${this.tableName}`);
            return result.rows;
        });
        this.pool = pool;
        this.tableName = tableName;
        pool.on("error", (err) => {
            console.error("Unexpected error on idle client", err);
            process.exit(-1);
        });
    }
}
