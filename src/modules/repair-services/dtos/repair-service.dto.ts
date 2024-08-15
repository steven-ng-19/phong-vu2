import { RepairServiceEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const RepairServiceRequestValidator = RepairServiceEntity.extend({});

export class RepairServiceDto extends createZodDto(
  RepairServiceRequestValidator,
) {}
