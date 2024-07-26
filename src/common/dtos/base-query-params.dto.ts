import * as Zod from 'zod';

import {
  FilterOperationType,
  FilterOrder,
  GeneratedFindOptions,
} from '@chax-at/prisma-filter';

import { DEFAULT_PAGE_SIZE } from '@common/constants';
import { createZodDto } from '@anatine/zod-nestjs';

// The fields are also validated in filter.parser.ts to make sure that only correct fields are used to filter

const createSingleFilterSchema = Zod.object({
  field: Zod.string(),
  type: Zod.nativeEnum(FilterOperationType),
  value: Zod.any(),
});

const createSingleFilterOrderSchema = Zod.object({
  field: Zod.string(),
  dir: Zod.enum(['asc', 'desc']) as Zod.ZodEnum<[FilterOrder, FilterOrder]>,
});

const createFilterSchema = Zod.object({
  filter: Zod.array(createSingleFilterSchema).optional(),
  order: Zod.array(createSingleFilterOrderSchema).optional(),
  offset: Zod.number().default(0),
  limit: Zod.number().default(DEFAULT_PAGE_SIZE),
});

class Filter extends createZodDto(createFilterSchema) {}

export class BaseQueryParams<TWhereInput> extends Filter {
  findOptions!: GeneratedFindOptions<TWhereInput>;
}
