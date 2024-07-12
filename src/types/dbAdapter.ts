// TODO: Simplify
export const Ops = {
  eq: "=",
  gt: ">",
  gte: ">=",
  lt: "<",
  lte: "<=",
  neq: "!=",
  ngt: "!>",
  ngte: "!>=",
  nlt: "!<",
  nlte: "!<=",
} as const;

export type Operator = (typeof Ops)[keyof typeof Ops];

export interface Row extends Record<string, any> {
  id: number | string;
}

export type Filter<T extends Row, K extends keyof T> = {
  field: K;
} & {
  operator: Operator;
  value: T[K];
};

export interface Repository<T extends Row> {
  name(): string;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: T["id"], data: Partial<T>): Promise<T>;
  delete(id: T["id"]): Promise<T>;
  read(id: T["id"]): Promise<T>;
  find<K extends keyof T>(filters: Filter<T, K>[]): Promise<T[]>;
}
