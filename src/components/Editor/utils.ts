import { CMSLink } from '../../cms-integration/markdown/links';
import { CMSEducationalExperience } from '../../cms-integration/markdown/educational';
import { CMSProfessionalExperience } from '../../cms-integration/markdown/professional';
import { EditorState } from './types';

export const createEntryId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

export const createProfessionalEntry = (): CMSProfessionalExperience => ({
  slug: createEntryId('professional'),
  attributes: {
    organization: '',
    startDate: '',
    endDate: '',
    title: '',
  },
  body: '',
  html: '',
});

export const createEducationEntry = (): CMSEducationalExperience => ({
  slug: createEntryId('education'),
  attributes: {
    achievement: '',
    completionYear: '',
    institution: '',
  },
  body: '',
  html: '',
});

export const createLinkEntry = (): CMSLink => ({
  href: '',
  iconName: 'github',
  title: '',
});

export const normalizeEntrySlug = (slug: string) => slug.replace(/^\d+-/, '');

export const reindexEntries = <T extends { slug: string }>(items: T[]): T[] => {
  return items.map((item, index) => ({
    ...item,
    slug: `${index}-${normalizeEntrySlug(item.slug)}`,
  }));
};

export const getSnapshot = (value: EditorState) => JSON.stringify(value);
