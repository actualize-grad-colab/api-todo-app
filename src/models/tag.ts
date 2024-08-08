import { defineTable, Schema, NewTableRow, TableRow } from "squid";

export type NewTagRecord = NewTableRow<TagsTable>;
export type TagRecord = TableRow<TagsTable>;

const table = defineTable("tags", {
  id: Schema.Number,
  label: Schema.String,
  user_id: Schema.Number,
});

export type TagsTable = typeof table;
