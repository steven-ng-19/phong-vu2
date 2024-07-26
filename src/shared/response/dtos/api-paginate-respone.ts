import * as Zod from 'zod';

import { createZodDto } from '@anatine/zod-nestjs';
import express from 'express';

const createApiPaginateResponseInputSchema = <T extends Zod.ZodTypeAny>(
  itemSchema: T,
) =>
  Zod.object({
    count: Zod.number(),
    data: Zod.array(itemSchema),
    query: Zod.object({
      limit: Zod.number(),
      offset: Zod.number(),
    }).optional(),
    req: Zod.object({
      path: Zod.string().optional(),
    }),
  });

const ApiPaginateResponseInput = createApiPaginateResponseInputSchema(
  Zod.any(),
);

export class ApiPaginateResponseInputType extends createZodDto(
  ApiPaginateResponseInput,
) {}

const createApiPaginateResponseSchema = <T extends Zod.ZodTypeAny>(
  itemSchema: T,
) =>
  Zod.object({
    next: Zod.string().optional().nullable(),
    previous: Zod.string().optional().nullable(),
    count: Zod.number(),
    results: Zod.array(itemSchema),
  });

const ApiPaginateResponse = createApiPaginateResponseSchema(Zod.any());

export class ApiPaginateResponseOutputType extends createZodDto(
  ApiPaginateResponse,
) {}
