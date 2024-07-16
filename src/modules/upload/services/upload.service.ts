import { BadRequestException, Injectable } from '@nestjs/common';

import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private cloudinaryService: CloudinaryService) {}

  async uploadToCloudinary(image: Express.Multer.File) {
    if (!image || !image.mimetype.startsWith('image/'))
      throw new BadRequestException('File is not an image');

    return await this.cloudinaryService.upload(image);
  }
}
