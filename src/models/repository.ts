// TODO: Put this into a utility/helpers file
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export default interface Repository<T extends Record<string, any>> {
  create(data: T): Promise<T>;
  update(data: AtLeast<T, "id">): Promise<T>;
  delete(id: string): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
