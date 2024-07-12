// NOTE: For associations, take one of two routes
// A) Eager load any associations
// B) Lazy load associations accessing them through methods
// B.2) I suppose you could hide the lazy loading behind a custom getter
// B.3) Yeah, then the implementation details are hidden besides needing to
// await `model.asocciatedModel` Is that even a thing? Maybe just K.I.S.S.

enum TodoStatus {
  canceled = "canceled",
  pending = "pending",
  active = "active",
  complete = "copmplete",
}

interface TodoCreationParams {
  title: string;
  body: string;
  status?: TodoStatus;
  user_id: number;
}

interface TodoRecord {
  todo_id: number;
  title: string;
  body: string;
  status: TodoStatus;
  user_id: number;
}
export default class TodoModel {
  static #isInternalConstructing = false;

  id: number;
  title: string;
  body: string;
  status: TodoStatus;
  user_id: any;

  constructor({ todo_id, title, body, status, user_id }: TodoRecord) {
    if (!TodoModel.#isInternalConstructing) {
      throw new TypeError("TodoModel is not externally constructable");
    }
    TodoModel.#isInternalConstructing = false;
    this.id = todo_id;
    this.title = title;
    this.body = body;
    this.status = status;
    this.user_id = user_id;
  }

  create({ title, body, status, user_id });

  async tags() {}
}
