import { useState, createContext } from 'react'

const Context = createContext({})

//Variables definition related to authentication
export const AuthenticationProvider = ({ children }) => {


    const [userInfo, setUserInfo] = useState({})
    const [loginStatus, setLoginStatus] = useState({
        loginError: false,
        errorMessage: ''
    })
    const [signupStatus, setSignupStatus] = useState({
        signupError: false,
        errorMessage: ''
    })
    const [fullName, setFullName] = useState('')
    const [isUserLogged, setIsUserLogged] = useState(false)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [isSignupLoading, setIsSignupLoading] = useState(false)

    return (
        <Context.Provider value={{
            userInfo, setUserInfo,
            isUserLogged, setIsUserLogged,
            loginStatus, setLoginStatus,
            signupStatus, setSignupStatus,
            isLoginLoading, setIsLoginLoading,
            isSignupLoading, setIsSignupLoading,
            fullName, setFullName
        }} >
            {children}
        </Context.Provider>
    )
}

export default Context