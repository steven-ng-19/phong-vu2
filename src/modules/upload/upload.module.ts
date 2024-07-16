import { Module } from '@nestjs/common';

import { UploadController } from './controllers';
import { CloudinaryProvider } from './providers';
import { CloudinaryService } from './services';
import { UploadService } from './services';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [CloudinaryProvider, CloudinaryService, UploadService],
  exports: [],
})
export class UploadModule {}
