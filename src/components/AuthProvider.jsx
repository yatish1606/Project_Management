import React, { useEffect, useState, useContext } from 'react'

const AuthContext = React.createContext(undefined)

export const AuthProvider = ({children}) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        setIsAuthenticated(false)
    }, [])

    const setAuth = state => {
        setIsAuthenticated(state)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);