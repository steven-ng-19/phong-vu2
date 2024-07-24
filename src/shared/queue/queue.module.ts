import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

import { AuthConsumer } from './consumer';
import { AuthModule } from '@modules/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { CONFIG_VAR } from '@config/config.constant';
import { QUEUE_NAMES } from './constants';
import { QueueService } from './queue.service';

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

    // import module
    AuthModule,
  ],
  controllers: [],
  providers: [QueueService, AuthConsumer],
  exports: [QueueService],
})
export class QueueModule {}
