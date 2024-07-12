import { query } from "./connection";

/*
 * Record: a single row in a db table
 * Model: the class used in the api codebase
 * Entity: the real thing being represented by the previous two
 */

type CreateTodoParams = { title: string; body: string; user_id: number };
type UpdateTodoParams = { title: string; body: string; todo_id: number };

export async function all() {
  const result = await query("SELECT * FROM todos;", []);
  return result.rows;
}

export async function getById(id: number) {
  const result = await query("SELECT * FROM todos WHERE todo_id = $1;", [id]);
  return result.rows;
}

export async function create({ title, body, user_id }: CreateTodoParams) {
  const result = await query(
    "INSERT INTO todos (title, body, user_id) VALUES ($1, $2, $3) RETURNING *;",
    [title, body, user_id],
  );
  return result.rows;
}

export async function update({ title, body, todo_id }: UpdateTodoParams) {
  const result = await query(
    "UPDATE todos SET title = $1, body = $2 WHERE todo_id = $3;",
    [title, body, todo_id],
  );
  return result.rows;
}

export async function destroy(id: number) {
  const result = await query("DELETE FROM todos WHERE todo_id = $1;", [id]);
  return result.rows;
}
