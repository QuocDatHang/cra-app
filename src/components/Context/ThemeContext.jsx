import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState('green');

    const handleChangeTheme = () => {
        setTheme(theme === 'green' ? 'orange' : 'green')
    }
    const themeValue = {
        theme,
        handleChangeTheme
    }

    return (
        <ThemeContext.Provider value={themeValue}>
            {children}
        </ThemeContext.Provider>
    )
}