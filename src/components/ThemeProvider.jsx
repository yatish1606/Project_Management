import React, { useEffect, useState, useContext } from 'react'

let themeName = 'light' | 'dark'

let ThemeContextType = {
    theme: themeName,
    setTheme : () => {}
}


const themeColors = {
    light : {
        background: '#fff',
        vlg:' #fafafa',
        lg: '#f6f6f6',
        mg: '#eee',
        dg: '#d3d3d3',
        vdg: '#ababab',
        sub: '#878787',
        title: '#3C3C3C',
        primaryColor: '#008EF6',
        danger: '#E04800',
        darkPrimaryColor: '#0080DE',
        primaryColorFaint: '#008EF620',
    },
    dark : {
        background: '#212121',
        vlg:' #232323',
        lg: '#252525',
        mg: '#292929',
        dg: '#333333',
        vdg: '#363636',
        sub: '#878787',
        title: '#DCDCDC',
        primaryColor: '#008EF6',
        danger: '#E04800',
        darkPrimaryColor: '#0080DE',
        primaryColorFaint: '#008EF620',
    },
}

const ThemeContext = React.createContext(undefined)

export const ThemeProvider = ({children}) => {
    
    const [themeName, setThemeName] = useState('dark')

    useEffect(() => {
        setTheme('dark')
    }, [])

    const setTheme = themeName => {

        document.body.style.setProperty("--background",themeColors[themeName].background)
        document.body.style.setProperty("--vlg",themeColors[themeName].vlg)
        document.body.style.setProperty("--lg",themeColors[themeName].lg)
        document.body.style.setProperty("--mg",themeColors[themeName].mg)
        document.body.style.setProperty("--dg",themeColors[themeName].dg)
        document.body.style.setProperty("--vdg",themeColors[themeName].vdg)
        document.body.style.setProperty("--sub",themeColors[themeName].sub)
        document.body.style.setProperty("--title",themeColors[themeName].title)


        setThemeName(themeName)
    }

    return (
        <ThemeContext.Provider value={{theme: themeName, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);