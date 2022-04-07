import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import PrivateRoutes from "../routes/Private.Routes";
import Header from '../common/components/Header/Header'
import Login from '../components/LogIn/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import userRegister from '../components/Register/Register';
import Page404 from '../components/404/Page404';



const Routes = () => {

    const [contextState] = useContext(GlobalContext);

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={contextState.token ? Dashboard : Login} />
                <PrivateRoutes exct path="/dashboard" component={Dashboard} />
                <Route path="/userregister" component={userRegister} />
                <Route exact path="*" component={Page404} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
