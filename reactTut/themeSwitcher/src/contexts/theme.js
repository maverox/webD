import { createContext, useContext } from "react";

// Create a new context object with default values for theme mode and theme switching functions
export const  ThemeContext = createContext( {
    themeMode: "light",
    lightTheme: () => {},
    darkTheme: () => {},
});

// Export the ThemeProvider component, which provides the ThemeContext object to all its children
export const ThemeProvider = ThemeContext.Provider;

// Define a custom hook that returns the current ThemeContext object
export const useTheme = () => {
    const context = useContext(ThemeContext);
    return context;
}