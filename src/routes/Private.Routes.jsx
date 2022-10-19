import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import Login from "../components/LogIn/Login";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const [contextState] = useContext(GlobalContext);
  return (
    <Route {...rest}>
      {contextState.token ? <Component /> : <Redirect to={<Login />} />}
    </Route>
  );
};

export default PrivateRoutes;
