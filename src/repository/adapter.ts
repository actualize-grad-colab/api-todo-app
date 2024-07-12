import { Pool } from "pg";
import { format } from "node-pg-format";
import { Filter, Ops, Repository, Row } from "../types/dbAdapter";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on("error", (err, _client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export function pgAdapter<T extends Row>(tableName: string): Repository<T> {
  return {
    name: () => tableName,

    create: async (data: T): Promise<T> => {
      const fmt = format(
        "INSERT INTO %I (%I) VALUES (%L) RETURNING *",
        tableName,
        Object.keys(data),
        Object.values(data),
      );

      console.log(fmt);
      const result = await pool.query(fmt);
      return result.rows[0] as T;
    },

    read: async (id: T["id"]): Promise<T> => {
      const result = await pool.query(
        `SELECT * FROM ${tableName} WHERE id = $1`,
        [id],
      );
      return result.rows[0] as T;
    },

    update: async (id: T["id"], data: Partial<T>): Promise<T> => {
      const keys = Object.keys(data);
      const result = await pool.query(
        `UPDATE ${tableName} SET ${keys
          .map((k, idx) => `${k} = $${idx + 2}`)
          .join(", ")}
          WHERE id = $1 RETURNING *`,
        [id, ...Object.values(data)],
      );
      return result.rows[0] as T;
    },

    delete: async (id: T["id"]): Promise<T> => {
      const result = await pool.query(
        `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`,
        [id],
      );
      return result.rows[0] as T;
    },

    find: async <K extends keyof T>(filters: Filter<T, K>[]): Promise<T[]> => {
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
      const query = `SELECT * FROM ${tableName} ${
        where ? `WHERE ${where}` : ""
      }`;
      const values = filters.flatMap((filter) => [filter.field, filter.value]);
      const result = await pool.query(format(query, ...values));
      return result.rows as T[];
    },

    all: async (): Promise<T[]> => {
      const result = await pool.query(`SELECT * FROM ${tableName}`);
      return result.rows as T[];
    },
  };
}
