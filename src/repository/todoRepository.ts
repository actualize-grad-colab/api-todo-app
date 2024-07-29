import { Repository, QueryFunction, ID } from "./iRepository";
import { TodoRecord, TodosTable } from "../models/todo";
import { sql } from "squid/pg";
import { NewTableRow, TableRow } from "squid";
import { spreadInsert, spreadUpdate } from "squid/pg";

export function todoRepository(query: QueryFunction): Repository<TodosTable> {
  const read = async (id: TodoRecord["id"]) => {
    const selectTodosWithTags = sql`
      SELECT
          td.id,
          td.title,
          td.body,
          td.status,
          tags.tags AS tags
      FROM todos AS td
      LEFT JOIN (
          SELECT
              tt.todo_id AS id,
              array_agg(t.label) AS tags
          FROM todo_tags AS tt
          LEFT JOIN tags AS t ON tt.tag_id = t.id
          GROUP BY tt.todo_id
      ) tags USING (id)
      WHERE td.id = ${id}`;
    const result = await query(selectTodosWithTags);
    return result.rows[0] as TodoRecord;
  };
  const create = async (
    data: NewTableRow<TodosTable>,
  ): Promise<TableRow<TodosTable>> => {
    const result = await query(
      sql`INSERT INTO todos ${spreadInsert(data)} RETURNING *`,
    );
    return result.rows[0] as TableRow<TodosTable>;
  };

  const update = async (
    id: number,
    data: Partial<NewTableRow<TodosTable>>,
  ): Promise<TableRow<TodosTable>> => {
    const result = await query(
      sql`UPDATE todos SET ${spreadUpdate(data)} WHERE id = ${id} RETURNING *`,
    );
    return result.rows[0] as TableRow<TodosTable>;
  };

  const remove = async (id: number): Promise<ID> => {
    const result = await query(
      sql`DELETE FROM todos WHERE id = ${id} RETURNING id`,
    );
    return result.rows[0] as ID;
  };

  const all = async (): Promise<TableRow<TodosTable>[]> => {
    const result = await query(sql`SELECT * FROM todos`);
    return result.rows as TableRow<TodosTable>[];
  };

  return { create, read, update, remove, all };
}
