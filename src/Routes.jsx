import React from 'react'
import { Link, Route, Switch } from "wouter";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Products from './pages/Products';
import Warehouses from './pages/Warehouses';

import { AuthenticationProvider } from './context/AuthenticationContext';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { ProductProvider } from './context/ProductContext';
import { DeleteModalProvider } from './context/DeleteModalContext';

const Routes = () => {
    return (
        <ProSidebarProvider>
            <AuthenticationProvider>
                <ProductProvider>
                    <DeleteModalProvider>
                        <Switch>
                            <Route path='/home/' component={Home} />
                            <Route path='/products/' component={Products} />
                            <Route path='/warehouses/' component={Warehouses} />
                            <Route path='/login/' component={Login} />
                            <Route path='/signup/' component={Signup} />
                        </Switch>
                    </DeleteModalProvider>
                </ProductProvider>
            </AuthenticationProvider>
        </ProSidebarProvider>
    )
}

export default Routes