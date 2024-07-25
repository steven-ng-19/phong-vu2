import { Controller, UseGuards } from '@nestjs/common';

import { AdminJwtAccessAuthGuard } from '@modules/auth/guards';

@UseGuards(AdminJwtAccessAuthGuard)
@Controller('admin/users')
export class AdminUserController {}
