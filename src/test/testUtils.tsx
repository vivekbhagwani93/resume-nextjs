import { render, RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren, ReactElement } from 'react';

const Wrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
