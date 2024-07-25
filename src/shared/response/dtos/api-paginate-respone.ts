import { BaseQueryParams, SingleFilter, SingleFilterOrder } from '@common/dtos';

import { Request } from 'express';

export class ApiPaginateResponseInput<T> {
  count!: number;
  data!: T[];
  query?: {
    limit: number;
  };
  req?: Request;
}

export class ApiPaginateResponse<T> {
  next?: string;
  previous?: string;
  count!: number;
  results!: T[];
}
