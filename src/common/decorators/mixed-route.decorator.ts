import { SetMetadata } from '@nestjs/common';

export const IS_MIXED_KEY = 'isMixed';
export const Mixed = () => SetMetadata(IS_MIXED_KEY, true);
