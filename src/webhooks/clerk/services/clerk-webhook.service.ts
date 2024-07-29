import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from '../dtos';
import { UserDto } from '@modules/users/dtos';
import { UserService } from '@modules/users/services';

@Injectable()
export class ClerkWebhookService {
  constructor(private readonly _userService: UserService) {}

  async updateOwnProfile(clerkId: string, data: UpdateProfileDto) {
    const user = (await this._userService.findOne({
      clerkId,
    })) as UserDto;

    await this._userService.update(
      {
        id: user.id,
      },
      {
        ...data,
      },
    );
  }
}
