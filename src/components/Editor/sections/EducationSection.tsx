import React from 'react';
import { inputStyle, sectionCardStyle, textareaStyle, toolbarButtonStyle } from '../editorStyles';
import { EditorState } from '../types';

interface EducationSectionProps {
  form: EditorState;
  addEducationEntry: () => void;
  moveEducationEntry: (index: number, direction: -1 | 1) => void;
  deleteEducationEntry: (index: number) => void;
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

export const EducationSection: React.FC<EducationSectionProps> = ({
  form,
  addEducationEntry,
  moveEducationEntry,
  deleteEducationEntry,
  updateSectionField,
  updateSectionBody,
}) => {
  return (
    <section style={sectionCardStyle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <h2 style={{ margin: 0 }}>Education</h2>
        <button type="button" onClick={addEducationEntry} style={toolbarButtonStyle}>
          + Add education
        </button>
      </div>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {form.education.map((item, index) => (
          <div
            key={item.slug}
            style={{
              border: '1px solid #dbe3f0',
              borderRadius: '0.9rem',
              padding: '1rem',
              background: '#f8fbff',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.85rem',
                flexWrap: 'wrap',
              }}
            >
              <strong>Entry #{index + 1}</strong>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => moveEducationEntry(index, -1)}
                  style={toolbarButtonStyle}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveEducationEntry(index, 1)}
                  style={toolbarButtonStyle}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => deleteEducationEntry(index)}
                  style={{ ...toolbarButtonStyle, color: '#b91c1c' }}
                >
                  Delete
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              }}
            >
              <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
                Achievement
                <input
                  style={inputStyle}
                  value={item.attributes.achievement}
                  onChange={(event) =>
                    updateSectionField('education', index, 'achievement', event.target.value)
                  }
                />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
                Institution
                <input
                  style={inputStyle}
                  value={item.attributes.institution}
                  onChange={(event) =>
                    updateSectionField('education', index, 'institution', event.target.value)
                  }
                />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
                Completion year
                <input
                  style={inputStyle}
                  value={item.attributes.completionYear}
                  onChange={(event) =>
                    updateSectionField('education', index, 'completionYear', event.target.value)
                  }
                />
              </label>
            </div>
            <label
              style={{
                display: 'grid',
                gap: '0.35rem',
                fontWeight: 600,
                marginTop: '1rem',
              }}
            >
              Details (markdown)
              <textarea
                style={textareaStyle}
                value={item.body}
                onChange={(event) => updateSectionBody('education', index, event.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};
