import { SENDGRID_API_KEY } from '@common/constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

interface SendGridMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}
export type SendGridTextMessage = Omit<SendGridMessage, 'html'>;
export type SendGridHtmlMessage = Omit<SendGridMessage, 'text'>;

@Injectable()
export class SendGridService {
  constructor(private configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get(SENDGRID_API_KEY));
  }

  public async sendEmail(
    message: SendGridTextMessage | SendGridHtmlMessage,
  ): Promise<any> {
    return SendGrid.send(message);
  }
}
