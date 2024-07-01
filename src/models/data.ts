import { query } from "./connection";

/*
 * Record: a single row in a db table
 * Model: the class used in the api codebase
 * Entity: the real thing being represented by the previous two
 */

type CreateTodoParams = { title: string; body: string; user_id: number };
// type UpdateTodoParams = CreateTodoParams + todo_id;
type TodoRecord = { id: number; title: string; body: string; user_id: number };
// type TodoModel = {}
// type TodoResponse = {}

export async function all() {
  const result = await query("SELECT * FROM todos;", []);
  return result.rows;
}

export async function getById(id: number) {
  const result = await query("SELECT * FROM todos WHERE todo_id = $1;", [id]);
  return result.rows;
}

export async function createTodo({ title, body, user_id }: CreateTodoParams) {
  const result = await query(
    "INSERT INTO todos (title, body, user_id) VALUES ($1, $2, $3) RETURNING *;",
    [title, body, user_id],
  );
  // TODO: Create model instance
  return result.rows;
}
