import { BadRequestException, Injectable } from '@nestjs/common';
import { ClerkClient, User, createClerkClient } from '@clerk/clerk-sdk-node';

import { CONFIG_VAR } from '@config/config.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkService {
  private _clerkClient: ClerkClient;
  constructor(private readonly _configService: ConfigService) {
    this._clerkClient = createClerkClient({
      secretKey: this._configService.get(CONFIG_VAR.CLERK_SECRET_KEY),
      publishableKey: this._configService.get(CONFIG_VAR.CLERK_PUBLIC_KEY),
      apiUrl: this._configService.get(CONFIG_VAR.CLERK_API_URL),
    });
  }

  async getProfile(userId: string): Promise<User> {
    try {
      const user = await this._clerkClient.users.getUser(userId);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateProfile(userId: string, data: any) {
    try {
      const user = await this._clerkClient.users.updateUser(userId, data);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
