export type SuccessResponse<T> = {
  success: boolean;
  data?: T;
};

export type PaginateResponse<T> = {
  count: number;
  data: Partial<T>[];
};
