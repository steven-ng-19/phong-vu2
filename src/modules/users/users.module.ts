import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminUsersController } from './controllers/admin-users.controller';
import { NotifiationsController } from './controllers/notification.controller';
import { UsersController } from './controllers/users.controller';
import { ADDRESS_MODEL, AddressSchema } from './models';
import { USER_MODEL, UserSchema } from './models/user.schema';
import { AddressService } from './services/address.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_MODEL, schema: UserSchema },
      { name: ADDRESS_MODEL, schema: AddressSchema },
    ]),
  ],
  controllers: [UsersController, NotifiationsController, AdminUsersController],
  providers: [UsersService, AddressService],
  exports: [UsersService],
})
export class UsersModule {}
