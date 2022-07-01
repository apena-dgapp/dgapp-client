import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import PrivateRoutes from "../routes/Private.Routes";
import Navbar from "../common/components/Navbar/Navbar";
// import SideBar from '../common/components/Sidebar/Sidebar';
import Login from "../components/LogIn/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import SinglePost from "../components/SinglePost/SinglePost";
import allPost from "../components/AllPost/AllPost";
import NewPost from "../components/NewPost/NewPost";
import userRegister from "../components/Register/Register";
import Page404 from "../components/404/Page404";
import ScrollToTop from "../utils/scrollToTop";
import Footer from "../common/components/Footer/Footer";
import Correspondence from "../components/Correspondence/Correspondence";
import Employee from "../components/EmployeeProfile/Employee";
import AboutUs from "../components/AboutUs/AboutUs";
import EmployeeChart from "../components/EmployeeProfile/EmployeeChart";
import EmployeeProfile from "../components/EmployeeProfile/Employee";
import DocDynamic from "../common/components/DocDynamic/DocDynamic";
import FilePdf from "../common/components/FilePdf/FilePdf";
import EmployeeDirectory from "../components/EmployeeDirectory/EmployeeDirectory";
import EmployeeTree from "../components/EmployeeTree/EmployeeTree";
import EmployeeEdit from "../components/EmployeeEdit/EmployeeEdit";
import EmployeeNew from "../components/EmployeeNew/EmployeeNew";
const Routes = () => {
  const [contextState] = useContext(GlobalContext);

  // <Route exact path={`${process.env.REACT_APP_RUTE}/`} component={contextState.token ? Dashboard : Login} />
  // <PrivateRoutes exct path={`${process.env.REACT_APP_RUTE}/home`} component={Dashboard} />

  const ruteServer = "";
  // const ruteServer = "/intranet";

  return (
    <BrowserRouter>
      <ScrollToTop />
      {contextState.token ? <Navbar /> : null}
      <Switch>
        <Route
          exact
          path={`${ruteServer}/`}
          component={contextState.token ? Dashboard : Login}
        />
        <PrivateRoutes exct path={`${ruteServer}/home`} component={Dashboard} />
        <Route path={`${ruteServer}/siglepost`} component={SinglePost} />
        <Route path={`${ruteServer}/allpost`} component={allPost} />
        <Route path={`${ruteServer}/userregister`} component={userRegister} />
        <Route path={`${ruteServer}/newpost`} component={NewPost} />
        <Route path={`${ruteServer}/employee`} component={Employee} />
        <Route path={`${ruteServer}/aboutus`} component={AboutUs} />
        <Route path={`${ruteServer}/employeechart`} component={EmployeeChart} />
        <Route path={`${ruteServer}/employeetree`} component={EmployeeTree} />
        <Route path={`${ruteServer}/employeeedit`} component={EmployeeEdit} />
        <Route path={`${ruteServer}/employeenew`} component={EmployeeNew} />
        <Route path={`${ruteServer}/docdynamic`} component={DocDynamic} />
        <Route path={`${ruteServer}/pdf`} component={FilePdf} />
        <Route
          path={`${ruteServer}/employeeprofile`}
          component={EmployeeProfile}
        />
        <Route
          path={`${ruteServer}/correspondence`}
          component={Correspondence}
        />
        <Route
          path={`${ruteServer}/employeedirectory`}
          component={EmployeeDirectory}
        />
        <Route exact path={`${ruteServer}*`} component={Page404} />
      </Switch>
      {contextState.token ? <Footer /> : null}
    </BrowserRouter>
  );
};

export default Routes;
