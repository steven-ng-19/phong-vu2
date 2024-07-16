import { JwtAuthGuard } from '@modules/auth/guards';
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploadService } from '../services';

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('cloudinary')
  @UseInterceptors(FileInterceptor('image'))
  async uploadToCloudinary(@UploadedFile() image: Express.Multer.File) {
    return this.uploadService.uploadToCloudinary(image);
  }
}
