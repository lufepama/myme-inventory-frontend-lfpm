import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { faArrowUpRightDots } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useProSidebar } from 'react-pro-sidebar'
import { useAuth } from '../../hooks/useAuth';
import Link from 'wouter'


const SidebarLayout = ({ children }) => {

    const { collapseSidebar, collapsed } = useProSidebar()
    const { onLogout, fullName } = useAuth()

    const handleCollapse = () => {
        collapseSidebar()
    }

    return (
        <div className='h-screen w-screen flex flex-col flex-1 '>
            <div className='flex flex-row w-full h-full '>
                <Sidebar>
                    <div className='flex flex-col h-full  '>
                        <Menu className='h-full pr-2 relative'>
                            <div className='absolute top-1 -right-0 text-red-300 '>
                                <FontAwesomeIcon
                                    className='text-white text-2xl' icon={collapsed ? faCircleChevronRight : faCircleChevronLeft}
                                    onClick={() => { handleCollapse() }}
                                />
                            </div>
                            <div className='flex flex-4 flex-col pt-8 mr-2 mt-10'>
                                {/* <Image
                                    src={'/images/logo.jpg'}
                                    width={100}
                                    height={100}
                                    className='rounded-2xl ml-3'
                                    alt='trading logo'
                                    onClick={() => { router.push('/home') }}
                                /> */}
                                <MenuItem
                                    className='mt-5'
                                    icon={<FontAwesomeIcon className='text-white' icon={faUser} />}

                                >
                                    <p className='font-semibold text-white'>{fullName.length > 0 ? fullName : 'Nombre de usuario'}</p>
                                </MenuItem>
                            </div>
                            <div className='flex-1 mt-12'>
                                <MenuItem
                                    icon={<FontAwesomeIcon className='text-white' icon={faHome} />}
                                // routerLink={<Link href='/home' />}
                                >
                                    <p className='font-semibold text-white'>Inicio</p>
                                </MenuItem>
                                <MenuItem
                                    icon={<FontAwesomeIcon className='text-white' icon={faDollar} />}
                                // routerLink={<Link href='/strategies' />}
                                >
                                    <p className='font-semibold text-white'>Estrategias</p>
                                </MenuItem>

                                <MenuItem
                                    icon={<FontAwesomeIcon className='text-white' icon={faArrowUpRightDots} />}
                                // routerLink={<Link href='/market' />}
                                >
                                    <p className='font-semibold text-white'>Mercado</p>
                                </MenuItem>

                            </div>
                            <div className='w-full'>
                                <MenuItem
                                    icon={<FontAwesomeIcon className='text-white' icon={faGear} />}
                                // routerLink={<Link href='/configuration' />}
                                >
                                    <p className='font-semibold text-white'>Configuracion</p>
                                </MenuItem>
                                <MenuItem
                                    icon={<FontAwesomeIcon className='text-white' icon={faArrowRightFromBracket} />}
                                    onClick={() => onLogout()}
                                >
                                    <p className='font-semibold text-white'>Salir</p>
                                </MenuItem>
                            </div>
                        </Menu>
                    </div>

                </Sidebar>
                <main className='bg-primary-color w-full h-full lg:p-10 sm:p-3 '>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default SidebarLayout