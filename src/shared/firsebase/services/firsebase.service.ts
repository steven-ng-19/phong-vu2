import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
} from '@common/constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirsebaseService {
  constructor(private readonly configService: ConfigService) {
    const adminConfig: ServiceAccount = {
      projectId: this.configService.get(FIREBASE_PROJECT_ID),
      privateKey: this.configService
        .get(FIREBASE_PRIVATE_KEY)
        .replace(/\\n/g, '\n'),
      clientEmail: this.configService.get(FIREBASE_CLIENT_EMAIL),
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        credential: firebase.credential.cert(adminConfig),
      });
    }
  }

  async sendNotification(
    registrationTokens: string[],
    payload: firebase.messaging.MessagingPayload,
  ) {
    if (!registrationTokens.length) return;
    return firebase.messaging().sendToDevice(registrationTokens, payload);
  }

  async sendToTopic(
    topic: 'all' | string,
    payload: firebase.messaging.MessagingPayload,
  ) {
    return firebase.messaging().sendToTopic(topic, payload);
  }
}
