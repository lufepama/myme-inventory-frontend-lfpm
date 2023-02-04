import React, { useState, useEffect } from 'react'
import Header from '../components/shared/Header'
import { useAuth } from '../hooks/useAuth'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CustomButton from '../components/shared/CustomButton';
import DividerWithText from '../components/shared/DividerWithText';
import { Link } from 'wouter';

const Login = () => {

    //**** Internal and external resources ****\\
    const [userData, setUserData] = useState({
        username: 'test',
        pssw: '1234',
        isPsswError: false,
        fieldsError: false,
    })

    const { onLogin, loginStatus, setLoginStatus, isLoginLoading, handleLoginLoader } = useAuth()

    const { loginError, errorMessage } = loginStatus

    const { username, pssw, fieldsError } = userData

    const handleChange = (name) =>
        (event) => {
            setUserData({ ...userData, [name]: event.target.value })
        };


    //**** Methods *****\\
    const areFieldsFilled = () => {
        if (!username || !pssw) {
            setUserData({ ...userData, fieldsError: true })
            return false
        }
        return true
    }

    const onSubmit = async () => {
        console.log('presse')
        setUserData({ ...userData, isPsswError: false, fieldsError: false })
        setLoginStatus({ ...loginStatus, loginError: false })
        const areFieldsFill = areFieldsFilled()
        if (areFieldsFill) {
            const data = { username: username, password: pssw }
            await onLogin(data)
        }
    }

    useEffect(() => {
        if (!loginError || !fieldsError) {
            handleLoginLoader(false)
        }
    }, [])

    return (
        <div className='h-screen w-screen bg-gradient-to-r from-gray-800 to-gray-500  flex flex-col'>
            <Header />
            <div className='bg-gradient-to-r from-gray-800 to-gray-500 flex flex-col items-center pb-20'>
                <div className='lg:w-auth-width md:w-auth-width sm:w-auth-width-sm
                bg-primary-color rounded-xl mt-5 p-1'>
                    <div className='w-full flex h-full bg-gray-300 rounded-xl'>
                        <div className='flex-col md:p-16 lg:p-16 sm:p-4'>
                            <p className='font-bold text-3xl mb-4 text-center'>Log in</p>
                            <div className='rounded-xl mt-2 w-3/2'>
                                <TextField
                                    placeholder='username'
                                    name='username'
                                    value={username}
                                    onChange={handleChange('username')}
                                    className='bg-gray-300 rounded-md w-full'
                                />
                                <TextField
                                    placeholder='Contraseña'
                                    hidden={true}
                                    type='password'
                                    name='pssw'
                                    onChange={handleChange('pssw')}
                                    className='bg-gray-300 rounded-md mt-3 w-full'
                                />
                            </div>
                            <span>Dont have an account? Create one <Link to='/signup/'><span className='text-blue-500 cursor-pointer'>here</span></Link>!</span>
                            {
                                loginError && <Alert className='mt-4' severity="error">{errorMessage}</Alert>
                            }
                            {
                                fieldsError && <Alert className='mt-4' severity="error">Please, fill required fields</Alert>
                            }
                            {
                                isLoginLoading
                                    ?
                                    (
                                        <div className='flex flex-row justify-center'>
                                            <CircularProgress />
                                        </div>
                                    )
                                    :
                                    (
                                        <div className='flex flex-row justify-center mt-4'>
                                            <CustomButton
                                                onSubmit={() => onSubmit()}
                                                text='Submit'
                                            />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login