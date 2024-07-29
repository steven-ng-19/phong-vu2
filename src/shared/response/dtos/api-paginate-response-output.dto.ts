export type ApiPaginateResponseOutputDto<T> = {
  next: string | null | undefined;
  previous: string | null;
  count: number;
  results: T[];
};
