import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
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
import AboutUs from "../components/AboutUs/AboutUs";
import EmployeeProfile from "../components/EmployeeProfile/Employee";
import FilePdf from "../common/components/FilePdf/FilePdf";
import EmployeeDirectory from "../components/EmployeeDirectory/EmployeeDirectory";
import EmployeeTree from "../components/EmployeeTree/Tree";
import EmployeeEdit from "../components/EmployeeEdit/EmployeeEdit";
import EmployeeNew from "../components/EmployeeNew/EmployeeNew";
import Building from "../common/components/Building/Building";
import Training from "../components/Training/Training";
import Course from "../components/Training/Course/Course";
import NewCourse from "../components/Training/NewCourse";
import CreateEvents from "../components/CreateEvents/CreateEvents";
import FoodOrder from "../components/FoodOrder/FoodOrder";
import TicketSystem from "../components/TicketSystem/TicketSystem";
import Documents from "../components/DownloadFile/Download";
import FormTemple from "../components/FormTemple/FormTemple";
import RequestMenu from "../components/FormTemple/RequestMenu";

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
      <ScrollToTop />
      {contextState.token ? <Navbar /> : null}
      <Routes>
        <Route
          path={`/`}
          element={contextState.token ? <Dashboard /> : <Login />}
        />
        <Route
          path={`/inicio`}
          element={contextState.token ? <Dashboard /> : <Login />}
        />

        <Route
          path={`/:category/:title`}
          element={contextState.token ? <SinglePost /> : <Login />}
        />
        <Route
          path={`/publicaciones/noticias/pagina/:number`}
          element={contextState.token ? <AllPost /> : <Login />}
        />

        <Route
          path={`/nosotros/:name`}
          element={contextState.token ? <AboutUs /> : <Login />}
        />

        <Route
          path={`/organigrama`}
          element={contextState.token ? <EmployeeTree /> : <Login />}
        />

        <Route path={`/pdf`} element={<FilePdf />} />

        <Route
          path={`/construccion`}
          element={contextState.token ? <Building /> : <Login />}
        />
        <Route
          path={`/perfil/:name`}
          element={contextState.token ? <EmployeeProfile /> : <Login />}
        />
        <Route
          path={`/servicios/recursoshumanos/solicitudes`}
          element={contextState.token ? <RequestMenu /> : <Login />}
        />
        <Route
          path={`/servicios/recursoshumanos/solicitudes/:name`}
          element={contextState.token ? <FormTemple /> : <Login />}
        />
        <Route
          path={`/servicios/recursoshumanos/solicitudes/:name/:id`}
          element={contextState.token ? <FormTemple /> : <Login />}
        />
        {
          contextState.userRole === 1 ?
            <Route
              path={`/perfil/editar/:name`}
              element={contextState.token ? <EmployeeEdit /> : <Login />}
            /> : <Route
              path={`*`}
              element={<Page404 />}
            />
        }

        <Route
          path={`/perfil/documentos/:name`}
          element={contextState.token ? <Documents /> : <Login />}
        />
        <Route
          path={`/directorio/pagina/:number`}
          element={contextState.token ? <EmployeeDirectory /> : <Login />}
        />
        {/* <Route
          path={`/directorio/`}
          element={contextState.token ? <EmployeeDirectory /> : <Login />}
        /> */}
        <Route
          path={`/entrenamiento`}
          element={contextState.token ? <Training /> : <Login />}
        />
        <Route
          path={`/entrenamiento/curso/crear`}
          element={contextState.token ? <NewCourse /> : <Login />}
        />
        <Route
          path={`/entrenamiento/curso/:courseId/edit`}
          element={contextState.token ? <NewCourse /> : <Login />}
        />
        <Route
          path={`/entrenamiento/curso/:courseId`}
          element={contextState.token ? <Course /> : <Login />}
        />
        <Route
          path={`/entrenamiento/curso/:courseId/:videolink`}
          element={contextState.token ? <Course /> : <Login />}
        />
        <Route
          path={`/foodorder`}
          element={contextState.token ? <FoodOrder /> : <Login />}
        />
        <Route
          path={`/servicios/tecnologia/ticket/:action`}
          element={contextState.token ? <TicketSystem /> : <Login />}
        />

        {
          contextState.userRole === 1 ?
            <Route
              path={`/administracion/registrar`}
              element={contextState.token ? <Register /> : <Login />}
            /> : <Route
              path={`*`}
              element={<Page404 />}
            />
        }

        {
          contextState.userRole === 1 || contextState.userRole === 3 ?
            <Route
              path={`/administracion/crear-entrada`}
              element={contextState.token ? <NewPost /> : <Login />}
            /> : <Route
              path={`*`}
              element={<Page404 />}
            />
        }

        {
          contextState.userRole === 1 || contextState.userRole === 3 ?
            <Route
              path={`/administracion/crear-evento`}
              element={contextState.token ? <CreateEvents /> : <Login />}
            /> : <Route
              path={`*`}
              element={<Page404 />}
            />
        }

        {
          contextState.userRole === 1 ?
            <Route
              path={`/administracion/nuevo-empleado`}
              element={contextState.token ? <EmployeeNew /> : <Login />}
            /> : <Route

              path={`*`}
              element={<Page404 />}
            />
        }
        <Route
          path={`*`}
          element={<Page404 />}
        />
      </Routes>
      {contextState.token ? <Footer /> : null}
    </Router>
  );
};

export default RoutesComponent;
