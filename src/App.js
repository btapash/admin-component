import React from 'react'
import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Pages/Home';
import Navbar from './components/Navigation/Navbar';
import AuthPage from './components/Pages/AuthPage';
import DashboardProfile from './components/Dashboard/DashboardProfile';
import AuthContext from './store/auth-context';

const App = () => {
    const authCtx = useContext(AuthContext);
    return (
            <>
                <Navbar />

                <Switch>

                    <Route path ="/" exact>
                        <Home />
                    </Route>

                    {!authCtx.isLoggedIn && (
                    <Route path='/auth'>
                        <AuthPage />
                    </Route>
                    )}

                    <Route path='/dashboard'>
                    {authCtx.isLoggedIn && <DashboardProfile/>}
                    {!authCtx.isLoggedIn && <Redirect to='/auth' />}
                    </Route>

                    <Route path='*'>
                    <Redirect to='/' />
                    </Route>

                </Switch>
            
            </>
        
    )
}

export default App
