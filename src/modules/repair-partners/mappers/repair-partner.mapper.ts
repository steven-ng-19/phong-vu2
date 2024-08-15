import {
  RepairPartnerCreateParams,
  RepairPartnerFindByCondition,
  RepairPartnerFindByKeyParams,
  RepairPartnerPrimaryKey,
  RepairPartnerUpdateParams,
} from '../types/repair-partner.type';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class RepairPartnerMapper {
  findOneByKey(
    params: RepairPartnerFindByKeyParams,
  ): Prisma.RepairPartnerFindFirstArgs {
    const { excludes = {}, ...rest } = params;

    return {
      where: {
        ...rest,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            {
              notIn: value,
            },
          ]),
        ),
        deletedAt: null,
      },
    };
  }

  findOne(
    params: RepairPartnerFindByCondition,
  ): Prisma.RepairPartnerFindFirstArgs {
    const { excludes = {}, repairServices, user, ...rest } = params;

    return {
      where: {
        ...rest,
        ...Object.fromEntries(
          Object.entries(excludes).map(([key, value]) => [
            key,
            {
              notIn: value,
            },
          ]),
        ),
        deletedAt: null,
      },
    };
  }

  create(data: RepairPartnerCreateParams): Prisma.RepairPartnerCreateArgs {
    return {
      data,
    };
  }

  update(
    { id }: RepairPartnerPrimaryKey,
    data: RepairPartnerUpdateParams,
  ): Prisma.RepairPartnerUpdateArgs {
    const { user, repairServices, ...rest } = data;
    return {
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...rest,
      },
    };
  }

  delete({ id }: RepairPartnerPrimaryKey): Prisma.RepairPartnerUpdateArgs {
    return {
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        repairServices: {
          updateMany: {
            data: {
              deletedAt: new Date(),
            },
            where: {
              repairPartnerId: id,
            },
          },
        },
      },
    };
  }
}
