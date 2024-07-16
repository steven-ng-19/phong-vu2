import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodObject } from 'zod';

@Injectable()
export class ZodValidationPipeCustom implements PipeTransform {
  constructor(private readonly _schema: ZodObject<any>) {}

  transform(value: any) {
    const result = this._schema.safeParse(value);

    if (result.error) {
      throw new HttpException(
        {
          errors: result.error.errors.map((detail) => ({
            message: detail.message,
            path: detail.path[0],
          })),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result.data;
  }
}
