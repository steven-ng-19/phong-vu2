import { DEFAULT_OPTS, QueueService } from '@shared/queue/queue.service';

import { AUTH_QUEUE_PROCCESS_NAME } from '../constants';
import { ClerkService } from '@shared/clerk/clerk.service';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES } from '@shared/queue/constants';

@Injectable()
export class AuthQueueService {
  constructor(
    private readonly _queueService: QueueService,
    private readonly _clerkService: ClerkService,
  ) {}

  async addChangePasswordJob(clerkId: string, password: string) {
    const job = await this._queueService.addJob<{
      clerkId: string;
      password: string;
    }>({
      queueName: QUEUE_NAMES.AUTH_QUEUE,
      processName: AUTH_QUEUE_PROCCESS_NAME.CHANGE_PASSWORD,
      payload: {
        clerkId,
        password,
      },
      opts: DEFAULT_OPTS,
    });

    return job;
  }

  // handleChangePassword({ clerkId, password }) {
  //   return this._clerkService.changePassword(clerkId, password);
  // }
}
