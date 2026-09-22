import { GetServerSideProps } from 'next';
import { resumeConfig } from '../../edit-me/config/resumeConfig';
import getCMSIntegration from '../cms-integration/getCMSIntegration';
import EditorPage from '../components/Editor/EditorPage';
import { EditorPageProps } from '../components/Editor/types';

export const getServerSideProps: GetServerSideProps<EditorPageProps> = async () => {
  if (process.env.NODE_ENV === 'production') {
    return { notFound: true };
  }

  const {
    education,
    hobbies,
    links,
    personalInformation,
    professional,
    skills,
  } = await getCMSIntegration('markdown');

  return {
    props: {
      education,
      hobbies,
      links,
      personalInformation,
      professional,
      skills,
      primaryColor: resumeConfig.primaryColor,
    },
  };
};

export default EditorPage;
