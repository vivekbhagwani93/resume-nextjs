import { CMSEducationalExperience } from '../../cms-integration/markdown/educational';
import { CMSHobbies } from '../../cms-integration/markdown/hobbies';
import { CMSLink } from '../../cms-integration/markdown/links';
import { CMSPersonalInformation } from '../../cms-integration/markdown/personal';
import { CMSProfessionalExperience } from '../../cms-integration/markdown/professional';
import { CMSSkillCategory } from '../../cms-integration/markdown/skills';

export interface EditorPageProps {
  education: CMSEducationalExperience[];
  hobbies: CMSHobbies;
  links: CMSLink[];
  personalInformation: CMSPersonalInformation;
  professional: CMSProfessionalExperience[];
  skills: CMSSkillCategory[];
  primaryColor: string;
}

export interface EditorState {
  personalInformation: CMSPersonalInformation;
  professional: CMSProfessionalExperience[];
  education: CMSEducationalExperience[];
  skills: CMSSkillCategory[];
  hobbies: CMSHobbies;
  links: CMSLink[];
  primaryColor: string;
}
