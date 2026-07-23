import React from 'react';
import { inputStyle, sectionCardStyle, textareaStyle, toolbarButtonStyle } from '../editorStyles';
import { EditorState } from '../types';

interface ProfessionalExperienceSectionProps {
  form: EditorState;
  addProfessionalEntry: () => void;
  moveProfessionalEntry: (index: number, direction: -1 | 1) => void;
  deleteProfessionalEntry: (index: number) => void;
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

export const ProfessionalExperienceSection: React.FC<ProfessionalExperienceSectionProps> = ({
  form,
  addProfessionalEntry,
  moveProfessionalEntry,
  deleteProfessionalEntry,
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
        <h2 style={{ margin: 0 }}>Professional experience</h2>
        <button type="button" onClick={addProfessionalEntry} style={toolbarButtonStyle}>
          + Add experience
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {form.professional.map((item, index) => (
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
                  onClick={() => moveProfessionalEntry(index, -1)}
                  style={toolbarButtonStyle}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveProfessionalEntry(index, 1)}
                  style={toolbarButtonStyle}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => deleteProfessionalEntry(index)}
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
                Organization
                <input
                  style={inputStyle}
                  value={item.attributes.organization}
                  onChange={(event) =>
                    updateSectionField('professional', index, 'organization', event.target.value)
                  }
                />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
                Title
                <input
                  style={inputStyle}
                  value={item.attributes.title}
                  onChange={(event) =>
                    updateSectionField('professional', index, 'title', event.target.value)
                  }
                />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
                Start date
                <input
                  style={inputStyle}
                  value={item.attributes.startDate}
                  onChange={(event) =>
                    updateSectionField('professional', index, 'startDate', event.target.value)
                  }
                />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
                End date
                <input
                  style={inputStyle}
                  value={item.attributes.endDate ?? ''}
                  onChange={(event) =>
                    updateSectionField('professional', index, 'endDate', event.target.value)
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
              Description (markdown)
              <textarea
                style={textareaStyle}
                value={item.body}
                onChange={(event) =>
                  updateSectionBody('professional', index, event.target.value)
                }
              />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};
