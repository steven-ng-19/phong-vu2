import { Module } from '@nestjs/common';
import { RepairPartnerMapper } from './mappers/repair-partner.mapper';
import { RepairPartnerService } from './services/repair-partner.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RepairPartnerMapper, RepairPartnerService],
  exports: [RepairPartnerService],
})
export class RepairPartnerModule {}
