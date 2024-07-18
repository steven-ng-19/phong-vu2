import { Prisma } from '@prisma/client';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const SortOrderSchema = z.enum([Prisma.SortOrder.asc, Prisma.SortOrder.desc]);

const BaseQuerySchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
  sort: z.record(z.string(), SortOrderSchema).optional(),
});

export class BaseQueryParams extends createZodDto(BaseQuerySchema) {}
