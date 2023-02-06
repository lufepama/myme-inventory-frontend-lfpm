import React, { useEffect } from 'react'
import SidebarLayout from '../components/shared/SidebarLayout'
import Cookies from 'js-cookie'
import { useLocation } from 'wouter'
import withAuthentication from '../hoc/withAuth'

const Home = () => {

    return (
        <SidebarLayout>
            <div className='flex flex-col pl-14 pr-14'>
                <h1 className='font-bold text-3xl text-center'>Wellcome to lfpmStock</h1>
                <div className='flex flex-col mt-10'>
                    <h1 className='font-bold text-3xl mb-5'>Who we are?</h1>
                    <p>
                        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                        Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,
                        cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una
                        galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
                        No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos
                        electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la
                        creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente
                        con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de
                        Lorem Ipsum.
                    </p>
                </div>
            </div>
        </SidebarLayout>
    )
}

export default withAuthentication(Home)