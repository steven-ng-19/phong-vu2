import { AuthConsumer, UserConsumer } from './consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

import { AuthModule } from '@modules/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { CONFIG_VAR } from '@config/config.constant';
import { QUEUE_NAMES } from './constants';
import { QueueService } from './queue.service';
import { UserModule } from '@modules/users/user.module';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          redis: {
            host: config.get(CONFIG_VAR.REDIS_HOST),
            port: config.get(CONFIG_VAR.REDIS_PORT),
            db: config.get(CONFIG_VAR.REDIS_DB_QUEUE),
          },
        };
      },
    }),

    // register queue
    BullModule.registerQueue({
      name: QUEUE_NAMES.AUTH_QUEUE,
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.USER_QUEUE,
    }),

    // import module
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [QueueService, AuthConsumer, UserConsumer],
  exports: [QueueService],
})
export class QueueModule {}
