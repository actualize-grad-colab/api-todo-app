import { defineTable, Schema, NewTableRow, TableRow } from "squid";

export type NewTodoRecord = NewTableRow<TodosTable>;
export type TodoRecord = TableRow<TodosTable>;

const TodoStatusValues = ["canceled", "pending", "active", "copmplete"];

const table = defineTable("todos", {
  id: Schema.Number,
  title: Schema.String,
  body: Schema.Number,
  status: Schema.Enum(TodoStatusValues),
  user_id: Schema.Number,
});

export type TodosTable = typeof table;
