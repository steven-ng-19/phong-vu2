import { JobOptions } from 'bull';

export type JobType<T> = {
  queueName: string;
  processName: string;
  payload: T;
  opts?: JobOptions;
};
