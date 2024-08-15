import { BussinessType, CompanyIndustry } from '../enums';
import { FindByIdRepairPartnerDto, UpdateRepairPartnerDto } from '../dtos';

import { CreateRepairPartnerDto } from '../dtos/create-repair-partner.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { RepairPartner } from '../types/repair-partner.type';
import { RepairPartnerMapper } from '../mappers/repair-partner.mapper';
import { SuccessResponse } from '@common/types';

@Injectable()
export class RepairPartnerService {
  constructor(
    private readonly _repairPartnerMapper: RepairPartnerMapper,
    private readonly _prismaService: PrismaService,
  ) {}

  async create(
    data: CreateRepairPartnerDto,
  ): Promise<SuccessResponse<undefined>> {
    const mappedData = this._repairPartnerMapper.create(data);

    await this._prismaService.repairPartner.create(mappedData);

    return {
      success: true,
    };
  }

  async update(
    params: FindByIdRepairPartnerDto,
    data: UpdateRepairPartnerDto,
  ): Promise<SuccessResponse<undefined>> {
    const mappedData = this._repairPartnerMapper.update(params, data);

    await this._prismaService.repairPartner.update(mappedData);

    return {
      success: true,
    };
  }

  async findOneById(
    params: FindByIdRepairPartnerDto,
  ): Promise<Partial<RepairPartner> | null> {
    const mappedData = this._repairPartnerMapper.findOne(params);
    const data = await this._prismaService.repairPartner.findFirst(mappedData);

    const result = data
      ? {
          ...data,
          bussinessType: BussinessType[data.bussinessType],
          companyIndustry: CompanyIndustry[data.companyIndustry],
        }
      : null;

    return result;
  }
}
