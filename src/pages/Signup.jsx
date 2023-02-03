import React, { useEffect, useState } from 'react'
import Header from '../components/shared/Header'
import TextField from '@mui/material/TextField';
import CustomButton from '../components/shared/CustomButton';
import DividerWithText from '../components/shared/DividerWithText';
import Cookies from 'js-cookie'
import { useAuth } from '../hooks/useAuth';
import Alert from '@mui/material/Alert';
import { Link } from 'wouter';
import CircularProgress from '@mui/material/CircularProgress';

const Signup = () => {
    //**** Internal and external resources ****\\
    const { onSignup, signupStatus, isSignupLoading, handleSignupLoader } = useAuth()
    const [userData, setUserData] = useState({
        username: 'test_',
        name: 'test1',
        lastName: 'test2',
        pssw1: '1234add',
        pssw2: '1234ad',
        isPsswError: false,
        fieldsError: false,
        success: false
    })
    const { username, name, lastName, pssw1, pssw2, isPsswError, fieldsError, success } = userData
    const { signupError, errorMessage } = signupStatus

    //**** Methods *****\\

    //Validate if psswds are the same
    const validatePswds = () => {
        if (pssw1 != pssw2) {
            setUserData({ ...userData, isPsswError: true })
            return false
        }
        return true
    }

    //Check if required fields are filled
    const areFieldsFilled = () => {
        if (!username || !pssw1 || !pssw2) {
            setUserData({ ...userData, fieldsError: true })
            return false
        }
        return true
    }

    //Handles the input fields values according to state
    const handleChange = (name) =>
        (event) => {
            setUserData({ ...userData, [name]: event.target.value })
        };

    const onSubmit = async () => {
        setUserData({ ...userData, isPsswError: false, fieldsError: false, success: false })
        const arePwdsEquals = validatePswds()
        const areFieldsFill = areFieldsFilled()

        if (arePwdsEquals && areFieldsFill) {
            const data = {
                username: username,
                password: pssw1,
                first_name: name,
                last_name: lastName
            }
            const res = await onSignup(data)
            if (res.success) {
                setUserData({ ...userData, success: true, isPsswError: false, fieldsError: false })
            } else {
                handleSignupLoader(false)
            }
        }
    }

    useEffect(() => {
        if (!isPsswError || !fieldsError || !signupError) {
            handleSignupLoader(false)
        }
    }, [])

    return (
        <div className='h-screen w-screen bg-gradient-to-r from-gray-800 to-gray-500  flex flex-col'>
            <Header />
            <div className='bg-gradient-to-r from-gray-800 to-gray-500 flex flex-col items-center pb-20'>
                <div className='lg:w-auth-width  md:w-auth-width sm:w-auth-width-sm
                bg-primary-color rounded-xl mt-5 p-1'>
                    <div className='w-full flex bg-gray-300 rounded-xl'>
                        <div className='w-full flex-col md:p-8 sm:p-4 lg:p-10'>
                            <p className='font-bold text-3xl mb-4 text-center'>Sign up</p>
                            <div className='flex flex-col rounded-xl mt-2 w-3/2'>
                                <TextField
                                    placeholder='username'
                                    size='small'
                                    value={username}
                                    name='username'
                                    onChange={handleChange('username')}
                                    className='bg-gray-300 rounded-md w-full'
                                    inputProps={{ style: { textAlign: 'center' } }}
                                />
                                <div className='flex flex-row w-full'>
                                    <TextField
                                        placeholder='First name'
                                        value={name}
                                        onChange={handleChange('name')}
                                        size='small'
                                        name='name'
                                        className='bg-gray-300 rounded-md mt-3 w-full'
                                        inputProps={{ style: { textAlign: 'center' } }}
                                    />
                                    <TextField
                                        placeholder='Last name'
                                        value={lastName}
                                        onChange={handleChange('lastName')}
                                        size='small'
                                        name='lastName'
                                        className='bg-gray-300 rounded-md mt-3 ml-2 w-full'
                                        inputProps={{ style: { textAlign: 'center' } }}
                                    />
                                </div>
                                <TextField
                                    placeholder='Password *'
                                    size='small'
                                    value={pssw1}
                                    name='pssw1'
                                    type='password'
                                    onChange={handleChange('pssw1')}
                                    className='bg-gray-300 rounded-md mt-3 w-full'
                                    inputProps={{ style: { textAlign: 'center' } }}
                                />
                                <TextField
                                    placeholder='Password *'
                                    size='small'
                                    value={pssw2}
                                    name='pssw2'
                                    type='password'
                                    onChange={handleChange('pssw2')}
                                    className='bg-gray-300 rounded-md  mt-3 w-full'
                                    inputProps={{ style: { textAlign: 'center' } }}
                                />
                            </div>
                            <span>Already have an account? Login <Link to='/login/'><span className='text-blue-500 cursor-pointer'>here</span></Link>!</span>

                            {
                                isPsswError && <Alert className='mt-4' severity="error">Passwords do not match.</Alert>
                            }
                            {
                                fieldsError && <Alert className='mt-4' severity="error">Please, fill required fields</Alert>
                            }
                            {
                                signupError && <Alert className='mt-4' severity="error">{errorMessage}</Alert>
                            }
                            {
                                success && <Alert className='mt-4' severity="success">
                                    Cuenta creada correctamente <Link href={'/login'}>
                                        <p className='text-bold'>Go to login</p>
                                    </Link>
                                </Alert>
                            }
                            {
                                isSignupLoading
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
                                                onSubmit={() => { onSubmit() }}
                                                text='Submit' />
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

export default Signup