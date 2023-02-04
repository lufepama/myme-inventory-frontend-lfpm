import React from 'react'
import { Link, Route, Switch } from "wouter";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Products from './pages/Products';
import Warehouses from './pages/Warehouses';
import WarehouseDetail from './pages/WarehouseDetail';

import { AuthenticationProvider } from './context/AuthenticationContext';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { ProductProvider } from './context/ProductContext';
import { ModalsProvider } from './context/ModalsContext';
import { WarehouseProvider } from './context/WarehouseContext';

const Routes = () => {
    return (
        <ProSidebarProvider>
            <AuthenticationProvider>
                <WarehouseProvider>
                    <ProductProvider>
                        <ModalsProvider>
                            <Switch>
                                <Route path='/home/' component={Home} />
                                <Route path='/products/' component={Products} />
                                <Route path='/warehouses/' component={Warehouses} />
                                <Route path='/warehouses/:id/' component={WarehouseDetail} />
                                <Route path='/login/' component={Login} />
                                <Route path='/signup/' component={Signup} />
                            </Switch>
                        </ModalsProvider>
                    </ProductProvider>
                </WarehouseProvider>
            </AuthenticationProvider>
        </ProSidebarProvider>
    )
}

export default Routes