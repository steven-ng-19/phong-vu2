import * as nodemailer from 'nodemailer';

import { BadRequestException, Injectable } from '@nestjs/common';

import { CONFIG_VAR } from '@config/config.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendMailService {
  private _transporter: nodemailer.Transporter;

  constructor(private readonly _configService: ConfigService) {
    this._transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true cho 465, false cho các cổng khác
      auth: {
        user: this._configService.get<string>(CONFIG_VAR.MAIL_USER),
        pass: this._configService.get<string>(CONFIG_VAR.MAIL_PASSWORD),
      },
    });
  }

  async sendMail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text: string;
    html: string;
  }) {
    const mailOptions = {
      from: this._configService.get<string>(CONFIG_VAR.MAIL_USER),
      to,
      subject,
      text,
      html,
    };

    await this._transporter.sendMail(mailOptions).catch((error) => {
      console.error(error);
      throw new BadRequestException(error ?? 'error when send mail');
    });
  }
}
