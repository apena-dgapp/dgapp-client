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
import Page404 from "../common/components/404/Page404";
import ScrollToTop from "../utils/scrollToTop";
import Footer from "../common/components/Footer/Footer";
import Correspondence from "../components/Correspondence/Correspondence";
import Employee from "../components/EmployeeProfile/Employee";
import AboutUs from "../components/AboutUs/AboutUs";
// import EmployeeChart from "../components/EmployeeProfile/EmployeeChart";
import EmployeeProfile from "../components/EmployeeProfile/Employee";
import DocDynamic from "../common/components/DocDynamic/DocDynamic";
import FilePdf from "../common/components/FilePdf/FilePdf";
import EmployeeDirectory from "../components/EmployeeDirectory/EmployeeDirectory";
import EmployeeTree from "../components/EmployeeTree/Tree";
import EmployeeEdit from "../components/EmployeeEdit/EmployeeEdit";
import EmployeeNew from "../components/EmployeeNew/EmployeeNew";
import Spinner from "../common/components/Spinner/Spinner";
import Building from "../common/components/Building/Building";
import Chat from "../components/Chat/Chat";
import ChatButton from "../common/components/ChatButton/ChatButton";
import Training from "../components/Training/Training";

const Routes = () => {
  const [contextState] = useContext(GlobalContext);

  return (
    <BrowserRouter>
      {contextState.token ? (
        !contextState.isShowChat ? (
          <ChatButton />
        ) : (
          <Chat />
        )
      ) : null}

      {contextState.isLoading ? <Spinner /> : null}
      <ScrollToTop />
      {contextState.token ? <Navbar /> : null}
      <Switch>
        <Route
          exact
          path={`${process.env.REACT_APP_RUTE}/`}
          component={contextState.token ? Dashboard : Login}
        />
        <PrivateRoutes
          exct
          path={`${process.env.REACT_APP_RUTE}/home`}
          component={Dashboard}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/siglepost`}
          component={SinglePost}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/allpost`}
          component={allPost}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/userregister`}
          component={userRegister}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/newpost`}
          component={NewPost}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employee`}
          component={Employee}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/aboutus`}
          component={AboutUs}
        />
        {/* <Route path={`${process.env.REACT_APP_RUTE}/employeechart`} component={EmployeeChart} /> */}
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeetree`}
          component={EmployeeTree}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeeedit`}
          component={EmployeeEdit}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeenew`}
          component={EmployeeNew}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/docdynamic`}
          component={DocDynamic}
        />
        <Route path={`${process.env.REACT_APP_RUTE}/pdf`} component={FilePdf} />
        <Route
          path={`${process.env.REACT_APP_RUTE}/building`}
          component={Building}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeeprofile`}
          component={EmployeeProfile}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeeprofile`}
          component={Correspondence}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeedirectory`}
          component={EmployeeDirectory}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/training`}
          component={Training}
        />
        <Route
          exact
          path={`${process.env.REACT_APP_RUTE}*`}
          component={Page404}
        />
      </Switch>
      {contextState.token ? <Footer /> : null}
    </BrowserRouter>
  );
};

export default Routes;
