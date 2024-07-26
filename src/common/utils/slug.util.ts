import slug = require('slug');

export const generateSlug = (value: string) =>
  slug(value) + '-' + new Date().getTime();
