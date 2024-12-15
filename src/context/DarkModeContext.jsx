import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function DarkModeProvider({ children }) {
  // we can check if the user uses the darkmode as a default in his computer or browser using
  const isDarkOS = window.matchMedia("(prefers-color-scheme: dark)").matches; // it returns true or false

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    isDarkOS,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode"); // document.documentElement => <html class="dark-mode">
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkMode context is used outside DarkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
