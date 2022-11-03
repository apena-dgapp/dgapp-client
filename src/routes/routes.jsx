import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import PrivateRoutes from "../routes/Private.Routes";
import Login from "../components/LogIn/Login";
import Navbar from "../common/components/Navbar/Navbar";
import Dashboard from "../components/Dashboard/Dashboard";
import Footer from "../common/components/Footer/Footer";
import SinglePost from "../components/SinglePost/SinglePost";
import allPost from "../components/AllPost/AllPost";
import NewPost from "../components/NewPost/NewPost";
import Register from "../components/Register/Register";
import Page404 from "../common/components/404/Page404";
import ScrollToTop from "../utils/scrollToTop";
// import Employee from "../components/EmployeeProfile/Employee";
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
import TicketSystem from "../components/TicketSystem/TicketSystem";

// const Navbar = lazy(()=> import("../common/components/Navbar/Navbar"));
// const Dashboard = lazy(()=> import("../components/Dashboard/Dashboard"));
// const Footer = lazy(()=> import("../common/components/Footer/Footer"));

const Routes = () => {
  const [contextState] = useContext(GlobalContext);

  return (
    <BrowserRouter>
      {/* {contextState.token ? (
        !contextState.isShowChat ? (
          <ChatButton />
        ) : (
          <Chat />
        )
      ) : null} */}
      <ScrollToTop/>
      {contextState.token ? <Navbar /> : null}
        <Switch>
          <Route
            exact
            path={`${process.env.REACT_APP_RUTE}/`}
            component={contextState.token ? Dashboard : Login}
          />
          <PrivateRoutes
            exct
            path={`${process.env.REACT_APP_RUTE}/inicio`}
            component={contextState.token ? Dashboard : Login}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/contenido`}
            component={contextState.token ? SinglePost : Login}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/noticias`}
            component={contextState.token ? allPost : Login}
          />
          
          <Route
            path={`${process.env.REACT_APP_RUTE}/nosotros`}
            component={contextState.token ? AboutUs : Login}
          />

          <Route
            path={`${process.env.REACT_APP_RUTE}/organigrama`}
            component={contextState.token ? EmployeeTree : Login}
          />
               <Route path={`${process.env.REACT_APP_RUTE}/pdf`} component={FilePdf} />
          
          <Route
            path={`${process.env.REACT_APP_RUTE}/construccion`}
            component={contextState.token ? Building : Login}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/perfil`}
            component={contextState.token ? EmployeeProfile : Login}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/directorio`}
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
            path={`${process.env.REACT_APP_RUTE}/ticket`}
            component={contextState.token ? TicketSystem : Login}
          />

         {
            contextState.userRole === 1  ?
              <Route
                path={`${process.env.REACT_APP_RUTE}/registrar`}
                component={contextState.token ? Register : Login}
              />:<Route
              exact
              path={`${process.env.REACT_APP_RUTE}*`}
              component={Page404}
            />
          }

          {
            contextState.userRole === 1 || contextState.userRole === 3  ?
              <Route
                path={`${process.env.REACT_APP_RUTE}/crear-entrada`}
                component={contextState.token ? NewPost : Login}
              />:<Route
              exact
              path={`${process.env.REACT_APP_RUTE}*`}
              component={Page404}
            />
          }

          {
            contextState.userRole === 1 || contextState.userRole === 3  ?
              <Route
                path={`${process.env.REACT_APP_RUTE}/crear-evento`}
                component={contextState.token ? CreateEvents : Login}
              />:<Route
              exact
              path={`${process.env.REACT_APP_RUTE}*`}
              component={Page404}
            />
          }

          {
            contextState.userRole === 1  ?
              <Route
                path={`${process.env.REACT_APP_RUTE}/editar-empleado`}
                component={contextState.token ? EmployeeEdit : Login}
              />:<Route
              exact
              path={`${process.env.REACT_APP_RUTE}*`}
              component={Page404}
              />
          }

          {
            contextState.userRole === 1 ?
              <Route
                path={`${process.env.REACT_APP_RUTE}/nuevo-empleado`}
                component={contextState.token ? EmployeeNew : Login}
              />:<Route
              exact
              path={`${process.env.REACT_APP_RUTE}*`}
              component={Page404}
              />
          }

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
