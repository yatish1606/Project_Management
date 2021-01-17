import React, { useEffect, useState, useContext } from 'react'

const UserContext = React.createContext(undefined)

export const UserProvider = ({children}) => {
    
    const [userInfo, setUserInfo] = useState({
        firstName : null,
        lastName : null,
        email : null,
        password : null,
        profilePhoto : null,
        designation : null,
        projects : null,
        createdAt : null,
        gender : null
    })

    useEffect(() => {
        setUserInfo({})
    }, [])

    const setUser = user => {
        setUserInfo({
            firstName : user.fname,
            lastName : user.lname,
            email : user.email,
            password : user.password,
            profilePhoto : user.profile_photo,
            designation : user.designation,
            projects : user.projects,
            createdAt : user.created_at,
            gender : user.gender
        })
        console.log('User info in UserContext is', userInfo)
    }

    return (
        <UserContext.Provider value={{user: userInfo, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);