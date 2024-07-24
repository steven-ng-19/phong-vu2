import { DEFAULT_OPTS, QueueService } from '@shared/queue/queue.service';

import { AUTH_QUEUE_PROCCESS_NAME } from '../constants';
import { AuthQueueSendMailRegisterType } from '../types/auth-queue.type';
import Bull from 'bull';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES } from '@shared/queue/constants';
import { SendMailService } from '@shared/email/send-mail.service';
import { readTemplate } from '@common/utils/template.util';

@Injectable()
export class AuthQueueService {
  constructor(
    private readonly _queueService: QueueService,
    private readonly _sendMailService: SendMailService,
  ) {}

  async addSendMailRegisterJob({
    title,
    content,
    titleLink,
    link,
    to,
    text,
    subject,
  }: AuthQueueSendMailRegisterType): Promise<void | Bull.Job<any>> {
    const result = await this._queueService.addJob({
      queueName: QUEUE_NAMES.AUTH_QUEUE,
      proccessName: AUTH_QUEUE_PROCCESS_NAME.SEND_MAIL_REGISTER,
      payload: { title, content, titleLink, link, to, text, subject },
      opts: DEFAULT_OPTS,
    });

    return result;
  }

  async handleSendRegisterMail({
    title,
    content,
    titleLink,
    link,
    to,
    text,
    subject,
  }: AuthQueueSendMailRegisterType): Promise<void> {
    const html = readTemplate({
      title,
      content,
      titleLink,
      link,
    });

    await this._sendMailService.sendMail({
      to,
      text,
      subject,
      html,
    });
  }
}
