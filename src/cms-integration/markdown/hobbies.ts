import fs from 'fs/promises';
import { marked } from 'marked';
import path from 'path';

export interface CMSHobbies {
  body: string;
  html: string;
}

const basePath = process.cwd();
const hobbiesPath = path.join(basePath, 'edit-me', 'cms', 'hobbies.md');

export const getHobbies = async (): Promise<CMSHobbies> => {
  const file = await fs.readFile(hobbiesPath);

  const html = marked.parse(file.toString(), { async: false });

  return {
    body: file.toString(),
    html,
  };
};
