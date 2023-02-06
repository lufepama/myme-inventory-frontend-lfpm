import React, { useEffect } from 'react'
import { useContext } from 'react'
import AuthenticationContext from '../context/AuthenticationContext'
import { useRouter, useLocation } from 'wouter'
import Cookies from 'js-cookie'
import { signup, login, logout } from '../helper/auth'

export const useAuth = () => {

    //Wrap all variables needed in this custom hook
    const { userInfo, setUserInfo, isUserLogged, setIsUserLogged,
        loginStatus, setLoginStatus, signupStatus, setSignupStatus,
        isSignupLoading, setIsSignupLoading, isLoginLoading, setIsLoginLoading,
        fullName, setFullName
    } = useContext(AuthenticationContext)
    const [_, navigate] = useLocation()

    const csrftoken = Cookies.get('csrftoken')

    //Manages state changing of loader 
    const handleLoginLoader = (value) => {
        setIsLoginLoading(value)
    }

    //Manages state changing of loader 
    const handleSignupLoader = (value) => {
        setIsSignupLoading(value)
    }

    //Saves usr data to Cookies
    const saveUserDataCookies = (data) => {
        Cookies.set('csrftoken', data.token)
        //If no name or lastname are set, we assign them default values
        if (!data.firstName) data.name = 'Nombre de'
        if (!data.lastName) data.apellidos = 'Usuario'
        const data_json = {
            name: data.firstName,
            lastName: data.lastName
        }
        Cookies.set('usr', JSON.stringify(data_json))
    }

    //When user is loged in, a cookie is created and user is redirected to home page
    const onLogin = async (data) => {
        setIsLoginLoading(true)
        const res = await login(data)
        if (res.success) {
            saveUserDataCookies(res)
            setLoginStatus({ ...loginStatus, loginError: false, errorMessage: '' })
            navigate('/')
            setIsLoginLoading(false)
        } else {
            setLoginStatus({ ...loginStatus, loginError: true, errorMessage: 'The password do not match' })
            setIsLoginLoading(false)
        }
        return res
    }

    //When a new user is created, signupstatus state is turned depending on http response
    //The error message is asigned to backend response error
    const onSignup = async (data) => {
        setIsSignupLoading(true)
        const res = await signup(data)
        const messg = res.message
        if (res.success) {
            setSignupStatus({ ...signupStatus, signupError: false, errorMessage: '' })
            setIsSignupLoading(false)
        } else {
            setSignupStatus({ ...signupStatus, signupError: true, errorMessage: messg.username.error })
            setIsSignupLoading(false)
        }
        return res
    }

    //Delete the Cookie and user is redirected to login page
    const onLogout = async () => {
        const res = await logout(csrftoken)
        if (res.success) {
            Cookies.remove('csrftoken')
            Cookies.remove('usr')
            navigate('/login/')
        }
    }

    //Format full name of user
    const formatedUserFullname = () => {
        const usr_cke = Cookies.get('usr')
        if (usr_cke) {
            const fullName = JSON.parse(Cookies.get('usr'))
            const firstName = fullName.name
            const lastName = fullName.lastName
            const formatedFullname = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`
            setFullName(formatedFullname)
        }
    }

    useEffect(() => {
        formatedUserFullname()
    }, [])


    return {
        loginStatus,
        signupStatus,
        setLoginStatus,
        isLoginLoading,
        isSignupLoading,
        fullName,
        onLogin,
        onSignup,
        onLogout,
        handleLoginLoader,
        handleSignupLoader,
        formatedUserFullname
    }
}
