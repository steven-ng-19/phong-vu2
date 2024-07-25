import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';

import { Job } from 'bull';
import { QUEUE_NAMES } from '../constants';
import { USER_QUEUE_PROCCESSNAME } from '@modules/users/constants/user-queue.constant';
import { UserQueueService } from '@modules/users/services';

@Processor(QUEUE_NAMES.AUTH_QUEUE)
export class UserConsumer {
  constructor(private readonly _userQueueService: UserQueueService) {}

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log('=============== On Complete  ============');
  }
  @OnQueueActive()
  onActive(job: Job) {
    console.log('=============== On Active  ============');
  }
  @OnQueueError()
  onError(job: Job) {
    console.log('=============== On Queue Error  ============');
  }
  @OnQueueFailed()
  onFailed(job: Job) {
    console.log('=============== On Queue Failed  ============');
  }

  @Process(USER_QUEUE_PROCCESSNAME.UPDATE_PROFILE)
  async handleUpdateOwnProfile(job: Job) {
    await this._userQueueService.handleUpdateOwnProfile(job.data);
  }
}
