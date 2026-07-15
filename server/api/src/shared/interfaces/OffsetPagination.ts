export interface OffsetPaginationOutPut<Entity> {
  items: Entity[];
  page: number;
  lastPage: number;
  limit: number;
  total : number
}

export interface OffsetPaginationInPut {
  page: number;
  limit: number;
}
