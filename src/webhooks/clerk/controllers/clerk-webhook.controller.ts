import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { WEBHOOK_EVENT } from 'src/webhooks/clerk/constants/webhook-event.constant';
import { ClerkWebhookService } from '../services';
import { UserWebhookEvent } from '@clerk/clerk-sdk-node';
import { UpdateProfileDto } from '../dtos';

@Controller('webhooks/clerk')
export class ClerkWebhookController {
  constructor(private readonly _clerkService: ClerkWebhookService) {}

  @Post('')
  async webhook(@Body() data: UserWebhookEvent) {
    switch (data.type) {
      case WEBHOOK_EVENT.USER_UPDATED:
        const params: UpdateProfileDto = {
          firstName: data.data.first_name as string,
          lastName: data.data.last_name as string,
          avatar: data.data.image_url,
          phone:
            data.data.phone_numbers.find(
              (item) => item.id === data.data.primary_phone_number_id,
            )?.phone_number ?? undefined,
        };
        this._clerkService.updateOwnProfile(data.data.id, params);
        break;
      default:
        throw new BadRequestException('Invalid webhook type');
    }
  }
}
