import React from 'react'
import { Link, Route, Switch } from "wouter";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

import { AuthenticationProvider } from './context/AuthenticationContext';
import { ProSidebarProvider } from 'react-pro-sidebar';

const Routes = () => {
    return (
        <ProSidebarProvider>
            <AuthenticationProvider>
                <Switch>
                    <Route path='/home/' component={Home} />
                    <Route path='/login/' component={Login} />
                    <Route path='/signup/' component={Signup} />
                </Switch>
            </AuthenticationProvider>
        </ProSidebarProvider>
    )
}

export default Routes