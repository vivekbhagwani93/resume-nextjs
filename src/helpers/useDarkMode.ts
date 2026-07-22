import { useCallback, useSyncExternalStore } from 'react';

const darkModeQuery = '(prefers-color-scheme: dark)';

const usePrefersDarkMode = (): boolean => {
  const subscribe = useCallback((callback: () => void) => {
    const mediaQuery = window.matchMedia(darkModeQuery);
    mediaQuery.addEventListener('change', callback);
    return () => {
      mediaQuery.removeEventListener('change', callback);
    };
  }, []);

  const getSnapshot = () => window.matchMedia(darkModeQuery).matches;

  // Match the previous default while rendering on the server.
  const getServerSnapshot = () => true;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default usePrefersDarkMode;
