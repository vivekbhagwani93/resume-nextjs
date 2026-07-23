import React from 'react';

export const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.85rem',
  borderRadius: '0.75rem',
  border: '1px solid #d5d9e2',
  fontSize: '0.95rem',
  boxSizing: 'border-box',
  background: '#fff',
};

export const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: '8rem',
  resize: 'vertical',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

export const sectionCardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '1rem',
  padding: '1.25rem',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  border: '1px solid #e5e7eb',
};

export const toolbarButtonStyle: React.CSSProperties = {
  border: '1px solid #cbd5e1',
  background: '#fff',
  color: '#0f172a',
  padding: '0.45rem 0.7rem',
  borderRadius: '0.7rem',
  cursor: 'pointer',
  fontWeight: 700,
};
