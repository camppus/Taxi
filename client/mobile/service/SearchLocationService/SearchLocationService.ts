export default interface ISearchLocationService {
  search(query: string): [];
}

export interface ISearchLocationResult {
  lat: number;
  log: number;
}
