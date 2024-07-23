import { ApiErrorResponse } from './dtos';
import { Injectable } from '@nestjs/common';
import { ResponseMessageCode } from './enums';

@Injectable()
export class ResponseService {
  public static errorResponse(exception: any): ApiErrorResponse {
    return {
      message: exception?.response?.message ?? exception?.message,
      messageCode: exception?.response?.code ?? ResponseMessageCode.FAILED,
      error: exception?.response?.error ?? exception?.name,
      errors: exception?.response?.errors ?? null,
    };
  }
}
