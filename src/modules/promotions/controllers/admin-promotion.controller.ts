import { QueryParam, Roles } from '@common/decorators';
import { UserRole } from '@common/enums';
import { ZodValidationPipeCustom } from '@common/pipes';
import { PromotionQueryParams } from '@common/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { CreatePromotionDto, CreatePromotionSchema } from '../dtos';
import { PromotionsService } from '../services/promotions.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
@Controller('admin/promotions')
export class AdminPromotionController {
  constructor(private promotionsService: PromotionsService) {}

  @Post()
  async createPromotion(
    @Body(new ZodValidationPipeCustom(CreatePromotionSchema))
    data: CreatePromotionDto,
  ) {
    return await this.promotionsService.createPromotion(data);
  }

  @Get()
  async getPromotions(@QueryParam() query: PromotionQueryParams) {
    return this.promotionsService.getPromotions(query);
  }

  @Get(':promotionId')
  async getPromotion(@Param('promotionId') promotionId: string) {
    return this.promotionsService.getPromotion(promotionId);
  }

  @Delete(':promotionId')
  async deletePromotion(@Param('promotionId') promotionId: string) {
    return this.promotionsService.deletePromotion(promotionId);
  }
}
