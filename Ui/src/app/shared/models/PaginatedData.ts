export interface PaginatedData<T> {
  perPage: number;
  currentPage: number;
  total: number;
  data: T[];
  lastPage: number;
}
