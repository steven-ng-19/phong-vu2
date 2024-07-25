import { DEFAULT_OPTS, QueueService } from '@shared/queue/queue.service';

import { ClerkService } from '@shared/clerk/clerk.service';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES } from '@shared/queue/constants';
import { USER_QUEUE_PROCCESSNAME } from '../constants/user-queue.constant';

@Injectable()
export class UserQueueService {
  constructor(
    private readonly _queueService: QueueService,
    private readonly _clerkService: ClerkService,
  ) {}

  async addUpdateOwnProfile(
    firstName: string,
    lastName: string,
    clerkId: string,
  ) {
    const job = await this._queueService.addJob<{
      clerkId: string;
      firstName: string;
      lastName: string;
    }>({
      processName: USER_QUEUE_PROCCESSNAME.UPDATE_PROFILE,
      queueName: QUEUE_NAMES.USER_QUEUE,
      payload: {
        firstName,
        lastName,
        clerkId,
      },
      opts: DEFAULT_OPTS,
    });

    return job;
  }

  async handleUpdateOwnProfile({ firstName, lastName, clerkId }) {
    return this._clerkService.updateProfile(clerkId, { firstName, lastName });
  }
}
