import React from 'react'
import { useLocation } from 'wouter'

// import Image from 'next/image'

const CustomButton = ({ text = '', url = null, iconUrl = null, onSubmit = null }) => {

    const [_, navigate] = useLocation()


    const handleClick = () => {
        if (url) navigate(url)
        if (onSubmit) onSubmit()
    }

    return (
        <div className='h-12 ml-3 mt-2 bg-green-600 flex flex-row items-center rounded-3xl'>
            <button className='p-5 flex flex-row items-center' onClick={() => handleClick()}>
                {
                    iconUrl && <img
                        src={iconUrl}
                        width={30}
                        height={30}
                        className='mr-3'
                        alt='social media icon'
                    />
                }
                <p className='text-white text-md'>{text}</p>
            </button>
        </div>
    )
}

export default CustomButton