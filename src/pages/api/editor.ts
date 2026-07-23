import { NextApiHandler } from 'next';
import fs from 'fs/promises';
import path from 'path';

interface EditorPayload {
  personalInformation: {
    attributes: {
      location: string;
      phone: string;
      email: string;
      familyName: string;
      givenName: string;
      title?: string;
      twitterUsername?: string;
    };
    body: string;
  };
  professional: Array<{
    slug: string;
    attributes: {
      organization: string;
      startDate: string;
      endDate?: string;
      title: string;
    };
    body: string;
  }>;
  education: Array<{
    slug: string;
    attributes: {
      achievement: string;
      completionYear: string;
      institution: string;
    };
    body: string;
  }>;
  skills: Array<{
    slug: string;
    attributes: {
      title: string;
    };
    body: string;
  }>;
  hobbies: {
    body: string;
  };
  links: Array<{
    href: string;
    iconName: string;
    title: string;
  }>;
  primaryColor: string;
}

const serializeFrontMatter = (attributes: Record<string, unknown>) => {
  const lines = ['---'];

  for (const [key, value] of Object.entries(attributes)) {
    if (typeof value === 'undefined' || value === null) {
      continue;
    }
    lines.push(`${key}: ${String(value)}`);
  }

  lines.push('---');
  return `${lines.join('\n')}\n`;
};

const handler: NextApiHandler = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(403).send('This editor is only available in local development.');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Only POST is supported.');
    return;
  }

  const payload = req.body as EditorPayload;

  if (!payload || !payload.personalInformation || !payload.professional) {
    res.status(400).send('Invalid payload.');
    return;
  }

  try {
    const basePath = process.cwd();

    await fs.writeFile(
      path.join(basePath, 'edit-me', 'cms', 'personal.md'),
      `${serializeFrontMatter(payload.personalInformation.attributes)}${payload.personalInformation.body.trim()}\n`,
      'utf8',
    );

    await Promise.all(
      payload.professional.map(async (item) => {
        const filePath = path.join(
          basePath,
          'edit-me',
          'cms',
          'professionalExperiences',
          `${item.slug}.md`,
        );

        await fs.writeFile(
          filePath,
          `${serializeFrontMatter(item.attributes)}${item.body.trim()}\n`,
          'utf8',
        );
      }),
    );

    await Promise.all(
      payload.education.map(async (item) => {
        const filePath = path.join(
          basePath,
          'edit-me',
          'cms',
          'educationalExperiences',
          `${item.slug}.md`,
        );

        await fs.writeFile(
          filePath,
          `${serializeFrontMatter(item.attributes)}${item.body.trim()}\n`,
          'utf8',
        );
      }),
    );

    await Promise.all(
      payload.skills.map(async (item) => {
        const filePath = path.join(basePath, 'edit-me', 'cms', 'skills', `${item.slug}.md`);

        await fs.writeFile(
          filePath,
          `${serializeFrontMatter(item.attributes)}${item.body.trim()}\n`,
          'utf8',
        );
      }),
    );

    await fs.writeFile(
      path.join(basePath, 'edit-me', 'cms', 'hobbies.md'),
      `${payload.hobbies.body.trim()}\n`,
      'utf8',
    );

    await fs.writeFile(
      path.join(basePath, 'edit-me', 'cms', 'links.ts'),
      [
        "import { CMSLink } from '../../src/cms-integration/markdown/links';",
        '',
        'export const links: CMSLink[] = [',
        ...payload.links.map((link) => `  {\n    href: '${link.href}',\n    iconName: '${link.iconName}',\n    title: '${link.title}',\n  },`),
        '];',
        '',
      ].join('\n'),
      'utf8',
    );

    await fs.writeFile(
      path.join(basePath, 'edit-me', 'config', 'resumeConfig.ts'),
      `interface ResumeConfig {\n  primaryColor: string;\n}\n\nexport const resumeConfig: ResumeConfig = { primaryColor: '${payload.primaryColor}' };\n`,
      'utf8',
    );

    res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown save error.';
    res.status(500).send(message);
  }
};

export default handler;
