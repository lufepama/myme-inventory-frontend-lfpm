import React from 'react'
import CustomButton from './CustomButton'
import logo from '../../assets/logo.png'
import { Link } from 'wouter'

const Header = () => {

    return (
        <div className='w-full bg-primary-color h-20 py-2 px-8'>
            <div className='flex flex-row justify-between'>
                <Link href='/home'>
                    <img
                        src={logo}
                        width={100}
                        height={400}
                        className='rounded-3xl'
                    />
                </Link>
                <div className='flex flex-row items-center'>
                    <CustomButton text='Login' url={'/login/'} />
                    <CustomButton text='Signup' url={'/signup/'} />
                </div>
            </div>
        </div>
    )
}

export default Header