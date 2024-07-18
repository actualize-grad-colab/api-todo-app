import pg from "pg";
import { format } from "node-pg-format";
import { Filter, Ops, Repository, Row } from "../types/dbAdapter";

export type QueryFunction = (
  text: string,
  params?: unknown[],
) => Promise<pg.QueryResult>;

export default class PgAdapter<T extends Row> implements Repository<T> {
  protected readonly query: QueryFunction;
  protected readonly tableName: string;

  constructor(query: QueryFunction, tableName: string) {
    this.query = query;
    this.tableName = tableName;
    // TODO: Move pool setup to main
    // TODO: Install and use andywer/squid
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
    const result = await this.query(fmt);
    return result.rows[0] as T;
  };

  read = async (id: T["id"]): Promise<T> => {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id],
    );
    return result.rows[0] as T;
  };

  update = async (id: T["id"], data: Partial<T>): Promise<T> => {
    const keys = Object.keys(data);
    const queryText = `UPDATE ${this.tableName} SET ${keys
      .map((k, idx) => `${k} = $${(idx + 2).toString()}`)
      .join(", ")}
          WHERE id = $1 RETURNING *`;
    console.log("Update queryText:\n", queryText);
    const result = await this.query(queryText, [
      id,
      [...(Object.values(data) as unknown[])],
    ]);
    return result.rows[0] as T;
  };

  delete = async (id: T["id"]): Promise<T> => {
    const queryText = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`;
    console.log("Delete queryText:\n", queryText);
    const result = await this.query(queryText, [id]);
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
    const result = await this.query(format(query, ...values));
    return result.rows as T[];
  };

  all = async (): Promise<T[]> => {
    const result = await this.query(`SELECT * FROM ${this.tableName}`);
    return result.rows as T[];
  };
}
