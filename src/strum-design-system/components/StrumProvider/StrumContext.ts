import { createContext, useContext } from 'react';
import { vars } from '../../themes/contract.css';
import { StrumProviderProps } from './StrumProvider';

interface StrumContext {
  colorScheme: StrumProviderProps['colorScheme'];
  theme: string | null;
}

export const StrumContext = createContext<StrumContext | null>(null);

export const useStrumTheme = () => {
  const context = useContext(StrumContext);

  if (context === null || context.theme === null) {
    throw new Error('No Strum theme available on context');
  }

  return { colorScheme: context.colorScheme, themeClass: context.theme, vars };
};
