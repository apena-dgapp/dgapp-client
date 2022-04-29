import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import PrivateRoutes from "../routes/Private.Routes";
import Navbar from '../common/components/Navbar/Navbar'
// import SideBar from '../common/components/Sidebar/Sidebar';
import Login from '../components/LogIn/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import SinglePost from '../components/SinglePost/SinglePost';
import allPost from '../components/AllPost/AllPost';
import NewPost from '../components/NewPost/NewPost';
import userRegister from '../components/Register/Register';
import Page404 from '../components/404/Page404';
import ScrollToTop from '../utils/scrollToTop';
import Footer from '../common/components/Footer/Footer';
import Correspondence from '../components/Correspondence/Correspondence';
import OrganizationChart from '../common/components/Organization/OrganizationChart';



const Routes = () => {

    const [contextState] = useContext(GlobalContext);

    return (
        <BrowserRouter>
            <ScrollToTop/>

        {
         contextState.token ? <Navbar/> : null  
        }
            
            <Switch>
                <Route exact path="/" component={contextState.token ? Dashboard : Login} />
                <PrivateRoutes exct path="/home" component={Dashboard} />
                <Route path="/siglepost" component={SinglePost}/>
                <Route path="/allpost" component={allPost}/>
                <Route path="/userregister" component={userRegister} />
                <Route path="/newpost" component={NewPost} />
                <Route path="/correspondence" component={Correspondence} />
                <Route path="/organization" component={OrganizationChart} />
                <Route exact path="*" component={Page404} />
            </Switch>

        {
         contextState.token ? <Footer/> : null  
        }
        </BrowserRouter>
    )
}

export default Routes;
