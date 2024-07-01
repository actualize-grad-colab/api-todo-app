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

export async function getTodo() {
  const result = await query("select * from todos;", []);
  return result;
}

export async function createTodo({ title, body, user_id }: CreateTodoParams) {
  const result = await query(
    "INSERT INTO todos (title, body, user_id) VALUES ($1, $2, $3);",
    [title, body, user_id],
  );
  // TODO: Create model instance
  return result;
}
