import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { QUEUE_NAMES } from './constants';
import { Job, JobOptions, Queue } from 'bull';
import { JobType } from './types';

export const DEFAULT_OPTS: JobOptions = {
  attempts: 3, // The total number of attempts to try the job until it completes.
  removeOnComplete: false, // If true, removes the job when it successfully completes. A number specifies the amount of jobs to keep.
  // Default behavior is to keep the job in the completed set.
};

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QUEUE_NAMES.AUTH_QUEUE) private readonly _authQueue: Queue,
    @InjectQueue(QUEUE_NAMES.USER_QUEUE) private readonly _userQueue: Queue,
  ) {}

  async addJob<T>(job: JobType<T>) {
    const { queueName, processName, payload, opts } = job;

    switch (queueName) {
      case QUEUE_NAMES.AUTH_QUEUE:
        await this._authQueue.add(processName, payload, opts).catch((err) => {
          console.error(err);
        });
        break;
      case QUEUE_NAMES.USER_QUEUE:
        await this._userQueue.add(processName, payload, opts).catch((err) => {
          console.error(err);
        });
        break;
      default:
        throw new BadRequestException(
          'Queue name not match because can not add job',
        );
    }
  }
}
