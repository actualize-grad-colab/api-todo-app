import * as pg from "pg";
import { QueryConfig } from "squid/pg";
import {
  NewTableRow,
  TableRow,
  TableSchema,
  TableSchemaDescriptor,
} from "squid";
export const Ops = {
  eq: "=",
} as const;

export type Operator = (typeof Ops)[keyof typeof Ops];

export type Filter<
  T extends TableSchema<TableSchemaDescriptor>,
  K extends keyof T["columns"],
> = {
  field: K;
} & {
  operator: Operator;
  value: T["columns"][K];
};

export interface ID {
  id: number;
}

export interface Repository<T extends TableSchema<TableSchemaDescriptor>> {
  create(data: NewTableRow<T>): Promise<TableRow<T>>;
  update(id: number, data: Partial<NewTableRow<T>>): Promise<TableRow<T>>;
  remove(id: number): Promise<ID>;
  read(id: number): Promise<TableRow<T>>;
  all(): Promise<TableRow<T>[]>;
}
export type QueryFunction = (config: QueryConfig) => Promise<pg.QueryResult>;
