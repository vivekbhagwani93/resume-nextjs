import React from 'react';
import { inputStyle, sectionCardStyle, textareaStyle } from '../editorStyles';
import { EditorState } from '../types';

interface SkillsSectionProps {
  form: EditorState;
  updateSectionField: (
    section: 'professional' | 'education' | 'skills',
    index: number,
    field: string,
    value: string,
  ) => void;
  updateSectionBody: (
    section: 'professional' | 'education' | 'skills',
    index: number,
    value: string,
  ) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  form,
  updateSectionField,
  updateSectionBody,
}) => {
  return (
    <section style={sectionCardStyle}>
      <h2 style={{ marginTop: 0 }}>Skills</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {form.skills.map((item, index) => (
          <div
            key={item.slug}
            style={{
              border: '1px solid #dbe3f0',
              borderRadius: '0.9rem',
              padding: '1rem',
              background: '#f8fbff',
            }}
          >
            <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
              Skill category title
              <input
                style={inputStyle}
                value={item.attributes.title}
                onChange={(event) =>
                  updateSectionField('skills', index, 'title', event.target.value)
                }
              />
            </label>
            <label
              style={{
                display: 'grid',
                gap: '0.35rem',
                fontWeight: 600,
                marginTop: '1rem',
              }}
            >
              Skill items (markdown)
              <textarea
                style={textareaStyle}
                value={item.body}
                onChange={(event) => updateSectionBody('skills', index, event.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};
