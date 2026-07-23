import React from 'react';
import { sectionCardStyle, textareaStyle } from '../editorStyles';
import { EditorState } from '../types';

interface HobbiesSectionProps {
  form: EditorState;
  updateHobbies: (value: string) => void;
}

export const HobbiesSection: React.FC<HobbiesSectionProps> = ({ form, updateHobbies }) => {
  return (
    <section style={sectionCardStyle}>
      <h2 style={{ marginTop: 0 }}>Hobbies</h2>
      <label style={{ display: 'grid', gap: '0.35rem', fontWeight: 600 }}>
        Hobbies copy (markdown)
        <textarea
          style={textareaStyle}
          value={form.hobbies.body}
          onChange={(event) => updateHobbies(event.target.value)}
        />
      </label>
    </section>
  );
};
