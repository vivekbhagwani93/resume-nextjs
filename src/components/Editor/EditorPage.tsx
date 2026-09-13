import Link from 'next/link';
import React from 'react';
import { useEditorPage } from './EditorContainer';
import { sectionCardStyle } from './editorStyles';
import { EditorPageProps } from './types';
import { EducationSection } from './sections/EducationSection';
import { HobbiesSection } from './sections/HobbiesSection';
import { LinksSection } from './sections/LinksSection';
import { PersonalInformationSection } from './sections/PersonalInformationSection';
import { ProfessionalExperienceSection } from './sections/ProfessionalExperienceSection';
import { SkillsSection } from './sections/SkillsSection';

const EditorPage: React.FC<EditorPageProps> = (props) => {
  const {
    form,
    status,
    message,
    hasChanges,
    previewName,
    updatePersonal,
    updateSectionField,
    updateSectionBody,
    moveProfessionalEntry,
    moveEducationEntry,
    moveLinkEntry,
    deleteProfessionalEntry,
    deleteEducationEntry,
    deleteLinkEntry,
    addProfessionalEntry,
    addEducationEntry,
    addLinkEntry,
    updateLink,
    updateHobbies,
    setPrimaryColor,
    handleSave,
  } = useEditorPage(props);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)',
        color: '#0f172a',
        padding: '2rem',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <form onSubmit={handleSave}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          <div
            style={{
              ...sectionCardStyle,
              background: `linear-gradient(135deg, ${form.primaryColor}22, #ffffff)`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>Local resume editor</p>
                <h1 style={{ margin: '0.35rem 0 0', fontSize: '2rem' }}>Edit your résumé data</h1>
                <p style={{ margin: '0.35rem 0 0', color: '#475569' }}>
                  Changes are written into the markdown sources under the <strong>edit-me</strong> folder.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link
                  href="/"
                  style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 700 }}
                >
                  Back to resume
                </Link>

                <label style={{ fontWeight: 600, display: 'grid', gap: '0.35rem' }}>
                  Accent color
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(event) => setPrimaryColor(event.target.value)}
                    style={{ width: '4rem', height: '2.5rem', border: 'none', background: 'transparent' }}
                  />
                </label>

                <button
                  type="submit"
                  disabled={!hasChanges || status === 'saving'}
                  style={{
                    border: 'none',
                    background: hasChanges ? form.primaryColor : '#94a3b8',
                    color: '#fff',
                    borderRadius: '999px',
                    padding: '0.85rem 1.2rem',
                    fontWeight: 700,
                    cursor: hasChanges ? 'pointer' : 'not-allowed',
                    opacity: hasChanges ? 1 : 0.7,
                  }}
                >
                  {status === 'saving' ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </div>

            {message ? (
              <p
                style={{
                  margin: '1rem 0 0',
                  color: status === 'error' ? '#b91c1c' : '#065f46',
                  fontWeight: 600,
                }}
              >
                {message}
              </p>
            ) : null}
          </div>

          <PersonalInformationSection
            form={form}
            previewName={previewName}
            updatePersonal={updatePersonal}
          />

          <ProfessionalExperienceSection
            form={form}
            addProfessionalEntry={addProfessionalEntry}
            moveProfessionalEntry={moveProfessionalEntry}
            deleteProfessionalEntry={deleteProfessionalEntry}
            updateSectionField={updateSectionField}
            updateSectionBody={updateSectionBody}
          />

          <EducationSection
            form={form}
            addEducationEntry={addEducationEntry}
            moveEducationEntry={moveEducationEntry}
            deleteEducationEntry={deleteEducationEntry}
            updateSectionField={updateSectionField}
            updateSectionBody={updateSectionBody}
          />

          <SkillsSection
            form={form}
            updateSectionField={updateSectionField}
            updateSectionBody={updateSectionBody}
          />

          <HobbiesSection form={form} updateHobbies={updateHobbies} />

          <LinksSection
            form={form}
            addLinkEntry={addLinkEntry}
            moveLinkEntry={moveLinkEntry}
            deleteLinkEntry={deleteLinkEntry}
            updateLink={updateLink}
          />
        </div>
      </form>
    </main>
  );
};

export default EditorPage;
