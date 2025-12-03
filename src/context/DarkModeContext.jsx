import { createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }
    },
    [isDarkMode]
  );

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((isDark) => !isDark);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode,
    }),
    [isDarkMode, toggleDarkMode]
  );

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarModeProvider');
  return context;
}

export { DarkModeProvider, useDarkMode };
