import { Repository, QueryFunction, ID } from "./iRepository";
import { NewTableRow, TableRow } from "squid";
import { spreadInsert, spreadUpdate, sql } from "squid/pg";
import { TagsTable } from "../models/tag";

export function tagRepository(query: QueryFunction): Repository<TagsTable> {
  const read = async (id: number) => {
    const result = await query(sql`SELECT * FROM tags WHERE id = ${id}`);
    return result.rows[0] as TableRow<TagsTable>;
  };

  const create = async (
    data: NewTableRow<TagsTable>,
  ): Promise<TableRow<TagsTable>> => {
    const result = await query(
      sql`INSERT INTO tags ${spreadInsert(data)} RETURNING *`,
    );
    return result.rows[0] as TableRow<TagsTable>;
  };

  const update = async (
    id: number,
    data: Partial<NewTableRow<TagsTable>>,
  ): Promise<TableRow<TagsTable>> => {
    const result = await query(
      sql`UPDATE tags SET ${spreadUpdate(data)} WHERE id = ${id} RETURNING *`,
    );
    return result.rows[0] as TableRow<TagsTable>;
  };

  const remove = async (id: number): Promise<ID> => {
    const result = await query(
      sql`DELETE FROM tags WHERE id = ${id} RETURNING id`,
    );
    return result.rows[0] as ID;
  };

  const all = async (): Promise<TableRow<TagsTable>[]> => {
    const result = await query(sql`SELECT * FROM tags`);
    return result.rows as TableRow<TagsTable>[];
  };

  return { create, read, update, remove, all };
}
