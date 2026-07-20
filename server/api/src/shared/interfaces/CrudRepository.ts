import {
  OffsetPaginationInPut,
  OffsetPaginationOutPut,
} from "./OffsetPagination";

export default interface CrudRepository<T> {
  save(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  findAll(input: OffsetPaginationInPut): Promise<OffsetPaginationOutPut<T>>;
}
