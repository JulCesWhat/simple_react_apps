import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from '../contexts/ThemeContext';

const Layout = ({ initialTheme, children }) => {
    return (
        <ThemeProvider startingTheme={initialTheme}>
            <LayoutNoThemeProvider>
                {
                    children
                }
            </LayoutNoThemeProvider>
        </ThemeProvider>
    );

}

const LayoutNoThemeProvider = ({ children }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={theme === 'light' ? 'container-fluid light' : 'container-fluid dark'}>
            {
                children
            }
        </div>
    )
}

export default Layout;