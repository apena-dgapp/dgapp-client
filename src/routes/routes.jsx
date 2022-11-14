import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import PrivateRoutes from "../routes/Private.Routes";
import Login from "../components/LogIn/Login";
import Navbar from "../common/components/Navbar/Navbar";
import Dashboard from "../components/Dashboard/Dashboard";
import Footer from "../common/components/Footer/Footer";
import SinglePost from "../components/SinglePost/SinglePost";
import AllPost from "../components/AllPost/AllPost";
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
import Course from "../components/Training/Course/Course";
import NewCourse from "../components/Training/NewCourse";
import CreateEvents from "../components/CreateEvents/CreateEvents";
import FoodOrder from "../components/FoodOrder/FoodOrder";
import TicketSystem from "../components/TicketSystem/TicketSystem";

// const Navbar = lazy(()=> import("../common/components/Navbar/Navbar"));
// const Dashboard = lazy(()=> import("../components/Dashboard/Dashboard"));
// const Footer = lazy(()=> import("../common/components/Footer/Footer"));

const RoutesComponent = () => {
  const [contextState] = useContext(GlobalContext);

  return (
    <Router>
      {/* {contextState.token ? (
        !contextState.isShowChat ? (
          <ChatButton />
        ) : (
          <Chat />
        )
      ) : null} */}
      <ScrollToTop/>
      {contextState.token ? <Navbar /> : null}
        <Routes>
          <Route   
            path={`${process.env.REACT_APP_RUTE}/`}
            element={contextState.token ?<Dashboard/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/inicio`}
            element={contextState.token ?<Dashboard/> : <Login/>}
          /> 

          <Route
            path={`${process.env.REACT_APP_RUTE}/:category/:title`}
            element={contextState.token ? <SinglePost/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/noticias`}
            element={contextState.token ? <AllPost/> : <Login/>}
          />
          
          <Route
            path={`${process.env.REACT_APP_RUTE}/nosotros/:name`}
            element={contextState.token ? <AboutUs/> : <Login/>}
          />

          <Route
            path={`${process.env.REACT_APP_RUTE}/organigrama`}
            element={contextState.token ? <EmployeeTree/> : <Login/>}
          />
          
          <Route  path={`${process.env.REACT_APP_RUTE}/pdf`} element={<FilePdf/>} />
          
          <Route
            path={`${process.env.REACT_APP_RUTE}/construccion`}
            element={contextState.token ? <Building/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/perfil/:name`}
            element={contextState.token ? <EmployeeProfile/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/directorio`}
            element={contextState.token ? <EmployeeDirectory/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/entrenamiento`}
            element={contextState.token ? <Training/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/entrenamiento/curso/crear`}
            element={contextState.token ? <NewCourse/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/entrenamiento/curso/:courseId/edit`}
            element={contextState.token ? <NewCourse/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/entrenamiento/curso/:courseId`}
            element={contextState.token ? <Course/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/entrenamiento/curso/:courseId/:videolink`}
            element={contextState.token ? <Course/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/foodorder`}
            element={contextState.token ? <FoodOrder/> : <Login/>}
          />
          <Route
            path={`${process.env.REACT_APP_RUTE}/ticket`}
            element={contextState.token ? <TicketSystem/> : <Login/>}
          />

         {
            contextState.userRole === 1  ?
              <Route
                path={`${process.env.REACT_APP_RUTE}/registrar`}
                element={contextState.token ? <Register/> : <Login/>}
              />:<Route
              path={`${process.env.REACT_APP_RUTE}*`}
              element={<Page404/>}
            />
          }

          {
            contextState.userRole === 1 || contextState.userRole === 3  ?
              <Route
                path={`${process.env.REACT_APP_RUTE}/crear-entrada`}
                element={contextState.token ? <NewPost/> : <Login/>}
              />:<Route
              path={`${process.env.REACT_APP_RUTE}*`}
              element={<Page404/>}
            />
          }

          {
            contextState.userRole === 1 || contextState.userRole === 3  ?
              <Route
                path={`${process.env.REACT_APP_RUTE}/crear-evento`}
                element={contextState.token ? <CreateEvents/> : <Login/>}
              />:<Route
              path={`${process.env.REACT_APP_RUTE}*`}
              element={<Page404/>}
            />
          }

          {
            contextState.userRole === 1  ?
              <Route
               path={`${process.env.REACT_APP_RUTE}/editar/:name`}
                element={contextState.token ? <EmployeeEdit/> : <Login/>}
              />:<Route 
              path={`${process.env.REACT_APP_RUTE}*`}
              element={<Page404/>}
              />
          }

          {
            contextState.userRole === 1 ?
              <Route
                path={`${process.env.REACT_APP_RUTE}/nuevo-empleado`}
                element={contextState.token ? <EmployeeNew/> : <Login/>}
              />:<Route
              
              path={`${process.env.REACT_APP_RUTE}*`}
              element={<Page404/>}
              />
          }

          <Route
            path={`${process.env.REACT_APP_RUTE}*`}
            element={<Page404/>}
          />
        </Routes>
      {contextState.token ? <Footer /> : null}
    </Router>
  );
};

export default RoutesComponent;
