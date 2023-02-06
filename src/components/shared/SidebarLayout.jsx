import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useProSidebar } from 'react-pro-sidebar'
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.png'
import { useLocation } from 'wouter'


const SidebarLayout = ({ children }) => {

    const { collapseSidebar, collapsed } = useProSidebar()
    const { onLogout, fullName } = useAuth()
    const [_, navigate] = useLocation()


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
                                <img
                                    src={logo}
                                    width={100}
                                    height={100}
                                    className='rounded-3xl ml-3 cursor-pointer'
                                    alt='trading logo'
                                    onClick={() => { navigate('/home/') }}
                                />
                                <MenuItem
                                    className='mt-5'
                                    icon={<FontAwesomeIcon className='text-white menu-icon-text' icon={faUser} />}
                                >
                                    <p className='font-semibold text-white menu-icon-text'>{fullName.length > 0 ? fullName : 'Nombre de usuario'}</p>
                                </MenuItem>

                            </div>
                            <div className='flex-1 mt-12'>

                                <MenuItem
                                    icon={<FontAwesomeIcon className='text-white menu-icon-text' icon={faBoxOpen} />}
                                    onClick={() => navigate('/products/')}
                                >
                                    <p className='font-semibold text-white menu-icon-text'>Products</p>
                                </MenuItem>
                                <MenuItem
                                    icon={<FontAwesomeIcon className='text-white menu-icon-text' icon={faWarehouse} />}
                                    onClick={() => navigate('/warehouses/')}
                                >
                                    <p className='font-semibold text-white menu-icon-text'>Warehouses</p>
                                </MenuItem>
                            </div>
                            <div className='w-full'>

                                <MenuItem
                                    icon={<FontAwesomeIcon className='text-white menu-icon-text' icon={faArrowRightFromBracket} />}
                                    onClick={() => onLogout()}
                                >
                                    <p className='font-semibold text-white menu-icon-text'>Logout</p>
                                </MenuItem>
                            </div>
                        </Menu>
                    </div>

                </Sidebar>
                <main className='bg-white w-full h-full lg:p-10 sm:p-3 '>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default SidebarLayout