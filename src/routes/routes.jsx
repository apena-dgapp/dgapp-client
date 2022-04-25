import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import PrivateRoutes from "../routes/Private.Routes";
import Navbar from '../common/components/Navbar/Navbar'
// import SideBar from '../common/components/Sidebar/Sidebar';
import Login from '../components/LogIn/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import SinglePost from '../components/SinglePost/SinglePost';
import NewPost from '../components/NewPost/NewPost';
import userRegister from '../components/Register/Register';
import Page404 from '../components/404/Page404';



const Routes = () => {

    const [contextState] = useContext(GlobalContext);

    return (
        <BrowserRouter>
        {
         contextState.token ? <Navbar/> : null  
        }
            
            <Switch>
                <Route exact path="/" component={contextState.token ? Dashboard : Login} />
                <PrivateRoutes exct path="/home" component={Dashboard} />
                <Route path="/siglepost" component={SinglePost}/>
                <Route path="/userregister" component={userRegister} />
                <Route path="/newpost" component={NewPost} />
                <Route exact path="*" component={Page404} />
            </Switch>
            {/* <SideBar/> */}
        </BrowserRouter>
    )
}

export default Routes;
