import {
  ApiPaginateResponseInputType,
  ApiPaginateResponseOutputType,
} from './dtos/api-paginate-respone';

import { ApiErrorResponse } from './dtos';
import { Injectable } from '@nestjs/common';
import { ResponseMessageCode } from './enums';
import { stringify } from 'querystring';

@Injectable()
export class ResponseService {
  public static paginateResponse(
    input: ApiPaginateResponseInputType,
  ): ApiPaginateResponseOutputType {
    const { count, data, query, req } = input;

    const { limit, offset } = query as {
      limit: number;
      offset: number;
    };

    const page = offset / limit + 1;

    const url = req?.path ?? '';
    const nextPage = page * limit < count ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    const next = nextPage
      ? `${url}?${stringify({ page: nextPage, limit })}`
      : null;
    const previous = previousPage
      ? `${url}?${stringify({
          page: previousPage,
          limit,
        })}`
      : null;

    return {
      next,
      previous,
      count,
      results: data,
    };
  }

  public static errorResponse(exception: any): ApiErrorResponse {
    return {
      message: exception?.response?.message ?? exception?.message,
      messageCode: exception?.response?.code ?? ResponseMessageCode.FAILED,
      error: exception?.response?.error ?? exception?.name,
      errors: exception?.response?.errors ?? null,
    };
  }
}
