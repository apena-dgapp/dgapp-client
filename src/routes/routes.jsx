import React, { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import PrivateRoutes from "../routes/Private.Routes";
import Navbar from "../common/components/Navbar/Navbar";
import Login from "../components/LogIn/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import SinglePost from "../components/SinglePost/SinglePost";
import allPost from "../components/AllPost/AllPost";
import NewPost from "../components/NewPost/NewPost";
import Register from "../components/Register/Register";
import Page404 from "../common/components/404/Page404";
import ScrollToTop from "../utils/scrollToTop";
import Footer from "../common/components/Footer/Footer";
import Employee from "../components/EmployeeProfile/Employee";
import AboutUs from "../components/AboutUs/AboutUs";
import EmployeeProfile from "../components/EmployeeProfile/Employee";
import FilePdf from "../common/components/FilePdf/FilePdf";
import EmployeeDirectory from "../components/EmployeeDirectory/EmployeeDirectory";
import EmployeeTree from "../components/EmployeeTree/Tree";
import EmployeeEdit from "../components/EmployeeEdit/EmployeeEdit";
import EmployeeNew from "../components/EmployeeNew/EmployeeNew";
import Building from "../common/components/Building/Building";
// import Chat from "../components/Chat/Chat";
// import ChatButton from "../common/components/ChatButton/ChatButton";
import Training from "../components/Training/Training";
import CreateEvents from "../components/CreateEvents/CreateEvents";
import FoodOrder from "../components/FoodOrder/FoodOrder";

const Routes = () => {
  const [contextState] = useContext(GlobalContext);
  const [loading, seLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      seLoading(true);
    }
    setTimeout(() => {
      if (!unmounted) {
        seLoading(false);
      }
    }, 1500);
    return () => {
      unmounted = true;
    };
  }, []);

  return loading ? (
    <div className="spinner-container">
      <ClipLoader color="#113250" loading={loading} size={150} />
    </div>
  ) : (
    <BrowserRouter>
      {/* {contextState.token ? (
        !contextState.isShowChat ? (
          <ChatButton />
        ) : (
          <Chat />
        )
      ) : null} */}
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
          component={contextState.token ? Dashboard : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/siglepost`}
          component={contextState.token ? SinglePost : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/allpost`}
          component={contextState.token ? allPost : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/register`}
          component={contextState.token ? Register : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/newpost`}
          component={contextState.token ? NewPost : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employee`}
          component={contextState.token ? Employee : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/aboutus`}
          component={contextState.token ? AboutUs : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/createevents`}
          component={contextState.token ? CreateEvents : Login}
        />
        {/* <Route path={`${process.env.REACT_APP_RUTE}/employeechart`} component={EmployeeChart} /> */}
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeetree`}
          component={contextState.token ? EmployeeTree : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeeedit`}
          component={contextState.token ? EmployeeEdit : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeenew`}
          component={contextState.token ? EmployeeNew : Login}
        />
        <Route path={`${process.env.REACT_APP_RUTE}/pdf`} component={FilePdf} />
        <Route
          path={`${process.env.REACT_APP_RUTE}/building`}
          component={contextState.token ? Building : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeeprofile`}
          component={contextState.token ? EmployeeProfile : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/employeedirectory`}
          component={contextState.token ? EmployeeDirectory : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/training`}
          component={contextState.token ? Training : Login}
        />
        <Route
          path={`${process.env.REACT_APP_RUTE}/foodorder`}
          component={contextState.token ? FoodOrder : Login}
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
