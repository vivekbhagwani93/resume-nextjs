import React from 'react';
import { inputStyle, sectionCardStyle, toolbarButtonStyle } from '../editorStyles';
import { EditorState } from '../types';

interface LinksSectionProps {
  form: EditorState;
  addLinkEntry: () => void;
  moveLinkEntry: (index: number, direction: -1 | 1) => void;
  deleteLinkEntry: (index: number) => void;
  updateLink: (index: number, field: keyof EditorState['links'][number], value: string) => void;
}

export const LinksSection: React.FC<LinksSectionProps> = ({
  form,
  addLinkEntry,
  moveLinkEntry,
  deleteLinkEntry,
  updateLink,
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
        <h2 style={{ margin: 0 }}>Links</h2>
        <button type="button" onClick={addLinkEntry} style={toolbarButtonStyle}>
          + Add link
        </button>
      </div>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {form.links.map((link, index) => (
          <div
            key={`${link.title}-${index}`}
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
              <strong>Link #{index + 1}</strong>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => moveLinkEntry(index, -1)}
                  style={toolbarButtonStyle}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveLinkEntry(index, 1)}
                  style={toolbarButtonStyle}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => deleteLinkEntry(index)}
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
                Title
                <input
                  style={inputStyle}
                  value={link.title}
                  onChange={(event) => updateLink(index, 'title', event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
                URL
                <input
                  style={inputStyle}
                  value={link.href}
                  onChange={(event) => updateLink(index, 'href', event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
                Icon name
                <input
                  style={inputStyle}
                  value={link.iconName}
                  onChange={(event) => updateLink(index, 'iconName', event.target.value)}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
