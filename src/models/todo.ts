const TodoStatusValues = {
  canceled: "canceled",
  pending: "pending",
  active: "active",
  complete: "copmplete",
} as const;

type TodoStatus = (typeof TodoStatusValues)[keyof typeof TodoStatusValues];

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
  user_id: number;

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
