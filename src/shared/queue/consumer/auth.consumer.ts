import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';

import { AUTH_QUEUE_PROCCESS_NAME } from '@modules/auth/constants';
import { AuthQueueService } from '@modules/auth/services/auth-queue.service';
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

  @Process(AUTH_QUEUE_PROCCESS_NAME.SEND_MAIL_REGISTER)
  async sendMailRegister(job: Job) {
    await this._authQueueService.handleSendRegisterMail(job.data);
  }
}
