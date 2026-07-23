import React from 'react';
import { inputStyle, sectionCardStyle } from '../editorStyles';
import { EditorState } from '../types';

interface PersonalInformationSectionProps {
  form: EditorState;
  previewName: string;
  updatePersonal: (
    field: keyof EditorState['personalInformation']['attributes'],
    value: string,
  ) => void;
}

export const PersonalInformationSection: React.FC<PersonalInformationSectionProps> = ({
  form,
  previewName,
  updatePersonal,
}) => {
  return (
    <section style={sectionCardStyle}>
      <h2 style={{ marginTop: 0 }}>Personal information</h2>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        {[
          ['givenName', 'Given name'],
          ['familyName', 'Family name'],
          ['title', 'Title'],
          ['location', 'Location'],
          ['phone', 'Phone'],
          ['email', 'Email'],
          ['twitterUsername', 'Twitter username'],
        ].map(([field, label]) => (
          <label key={field} style={{ display: 'grid', gap: '0.45rem', fontWeight: 600 }}>
            {label}
            <input
              style={inputStyle}
              value={
                form.personalInformation.attributes[
                  field as keyof EditorState['personalInformation']['attributes']
                ] ?? ''
              }
              onChange={(event) =>
                updatePersonal(
                  field as keyof EditorState['personalInformation']['attributes'],
                  event.target.value,
                )
              }
            />
          </label>
        ))}
      </div>

      <p style={{ marginTop: '1rem', color: '#475569' }}>
        Preview name: <strong>{previewName}</strong>
      </p>
    </section>
  );
};
