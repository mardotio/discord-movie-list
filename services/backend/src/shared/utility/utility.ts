export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageCount: number;
  currentPage: number;
  pageSize: number;
  order: 'ASC' | 'DESC';
}
