import PgAdapter from "./adapter";
import { Todo } from "../models/todo";
import { QueryFunction } from "./adapter";

export default class TodoRepository extends PgAdapter<Todo> {
  constructor(query: QueryFunction) {
    super(query, "todos");
  }

  read = async (id: Todo["id"]) => {
    // const selectTodosWithTags = `SELECT
    //     td.id,
    //     td.title,
    //     td.body,
    //     td.status,
    //     tags.tags AS tags
    // FROM todos AS td
    // WHERE td.id = $1
    // LEFT JOIN (
    //     SELECT
    //         tt.todo_id AS id,
    //         array_agg(t.label) AS tags
    //     FROM todo_tags AS tt
    //     LEFT JOIN tags AS t ON tt.tag_id = t.id
    //     GROUP BY tt.todo_id
    // ) tags USING (id);`;
    const result = await this.query(
      // TODO: Join to tags through todo_tags
      `SELECT * FROM ${this.tableName} WHERE id = $1 JOIN tags ON tags.id = todo_tags.tag_id`,
      [id],
    );
    return result.rows[0] as Todo;
  };
}
