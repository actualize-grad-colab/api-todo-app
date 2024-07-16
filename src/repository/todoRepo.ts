import { Pool } from "pg";
import PgAdapter from "./adapter";
import { Todo } from "../models/todo";

export default class TodoRepository extends PgAdapter<Todo> {
  constructor(pool: Pool) {
    super(pool, "todos");
  }

  read = async (id: Todo["id"]) => {
    const result = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id],
    );
    return result.rows[0] as Todo;
  };
}
