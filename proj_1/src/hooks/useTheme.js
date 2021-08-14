import { useState } from "react";

const useTheme = ({ initialTheme }) => {
    const [theme, setTheme] = useState(initialTheme);

    const validateTheme = (themeValue) => {
        if (themeValue === 'dark') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return { theme, setTheme: validateTheme };
}

export default useTheme;