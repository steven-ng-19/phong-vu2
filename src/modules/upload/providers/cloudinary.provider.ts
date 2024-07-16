import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from '@common/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get<string>(CLOUDINARY_NAME),
      api_key: configService.get<string>(CLOUDINARY_API_KEY),
      api_secret: configService.get<string>(CLOUDINARY_API_SECRET),
    });
  },
};
