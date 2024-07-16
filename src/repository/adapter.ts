import { Pool } from "pg";
import { format } from "node-pg-format";
import { Filter, Ops, Repository, Row } from "../types/dbAdapter";

export default class PgAdapter<T extends Row> implements Repository<T> {
  protected readonly pool: Pool;
  protected readonly tableName: string;

  constructor(pool: Pool, tableName: string) {
    this.pool = pool;
    this.tableName = tableName;
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }

  name = () => this.tableName;

  create = async (data: T): Promise<T> => {
    const fmt = format(
      "INSERT INTO %I (%I) VALUES (%L) RETURNING *",
      this.tableName,
      Object.keys(data),
      Object.values(data),
    );

    console.log("Create fmt:\n", fmt);
    const result = await this.pool.query(fmt);
    return result.rows[0] as T;
  };

  read = async (id: T["id"]): Promise<T> => {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id],
    );
    return result.rows[0] as T;
  };

  update = async (id: T["id"], data: Partial<T>): Promise<T> => {
    const keys = Object.keys(data);
    const result = await this.pool.query(
      `UPDATE ${this.tableName} SET ${keys
        .map((k, idx) => `${k} = $${idx + 2}`)
        .join(", ")}
          WHERE id = $1 RETURNING *`,
      [id, ...Object.values(data)],
    );
    return result.rows[0] as T;
  };

  delete = async (id: T["id"]): Promise<T> => {
    const result = await this.pool.query(
      `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0] as T;
  };

  find = async <K extends keyof T>(filters: Filter<T, K>[]): Promise<T[]> => {
    const where = filters
      .map((filter: Filter<T, K>): string => {
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
    const result = await this.pool.query(format(query, ...values));
    return result.rows as T[];
  };

  all = async (): Promise<T[]> => {
    const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
    return result.rows as T[];
  };
}
