import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Processor,
} from '@nestjs/bull';

import { AuthQueueService } from '@modules/auth/services';
import { Job } from 'bull';
import { QUEUE_NAMES } from '../constants';

@Processor(QUEUE_NAMES.AUTH_QUEUE)
export class AuthConsumer {
  constructor(private readonly _authQueueService: AuthQueueService) {}

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

  // @Process(AUTH_QUEUE_PROCCESS_NAME.CHANGE_PASSWORD)
  // async handleChangePassword(job: Job) {
  //   await this._authQueueService.handleChangePassword(job.data);
  // }
}
