export interface IBaseRepository<T> {
  Create(entity: T): Promise<T>;
  Update(entity: T): Promise<T>;
  Delete(id: string): Promise<void>;
  Get(id: string): Promise<T>;
  GetAll(): Promise<T[]>;
}
