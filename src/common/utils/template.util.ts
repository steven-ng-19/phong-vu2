import * as fs from 'fs';
import * as path from 'path';

export const readTemplate = ({
  fileName = 'template.html',
  title,
  content,
  titleLink,
  link,
}: {
  fileName?: string;
  title: string;
  content: string;
  titleLink: string;
  link: string;
}) => {
  return fs
    .readFileSync(
      path.resolve('src', 'shared', 'email', 'templates', fileName),
      'utf-8',
    )
    .replace('{{title}}', title)
    .replace('{{content}}', content)
    .replace('{{titleLink}}', titleLink)
    .replace('{{link}}', link);
};
