import { query } from "./connection";

/*
 * Record: a single row in a db table
 * Model: the class used in the api codebase
 * Entity: the real thing being represented by the previous two
 */

type TodoRecord = { id: number; title: string; body: string; user_id: number };

export async function getTodo() {
  const result = await query("select * from todos;", []);
  return result;
}

export async function createTodo() {
  const result = await query(
    "INNSERT INTO todos (title, body, user_id) VALUES ($1, $2, $3);",
    ["title", "body", 1],
  );
}
