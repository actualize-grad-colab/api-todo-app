// TODO:
// Too fancy!!! Strip this down, son!
enum TodoStatus {
  canceled = "canceled",
  pending = "pending",
  active = "active",
  complete = "copmplete",
}

// interface TodoCreationParams {
//   title: string;
//   body: string;
//   status?: TodoStatus;
//   user_id: number;
// }

interface TodoRecord {
  todo_id: number;
  title: string;
  body: string;
  status: TodoStatus;
  user_id: number;
}
export class Todo {
  static #isInternalConstructing = false;

  id: number;
  title: string;
  body: string;
  status: TodoStatus;
  user_id: any;

  constructor({ todo_id, title, body, status, user_id }: TodoRecord) {
    if (!Todo.#isInternalConstructing) {
      throw new TypeError("Todo is not externally constructable");
    }
    Todo.#isInternalConstructing = false;
    this.id = todo_id;
    this.title = title;
    this.body = body;
    this.status = status;
    this.user_id = user_id;
  }
}
// type CreateTodoParams = { title: string; body: string; user_id: number };
// type UpdateTodoParams = { title: string; body: string; todo_id: number };