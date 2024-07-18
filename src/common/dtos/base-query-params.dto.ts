import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class BaseQueryParams {
  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  limit?: number;

  @ApiPropertyOptional()
  search?: string;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
  })
  // sort?: {
  //   [key: string]: Prisma.SortOrder;
  // };
}
