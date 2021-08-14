import { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children, startingTheme }) => {
    const [theme, setTheme] = useState(startingTheme);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {
                children
            }
        </ThemeContext.Provider>
    );
}

export { ThemeProvider }