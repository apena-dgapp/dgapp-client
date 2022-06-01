import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../../context/GlobalContext";
import NavbarForm from "./NavbarForm";
import { getOnePerson } from "../../../api/person";
import toast from "react-hot-toast";

const Header = () => {
  const history = useHistory();

  //InitialState - ContexState
  const [contextState, , contextMiddleware] = useContext(GlobalContext);

  const [person, setPerson] = useState({
    personId: "",
    fullName: "",
    position: "",
    birthday: "",
    photo: "",
  });

  const employeeProfile = (e) => {
    const employeeId = e.currentTarget.id;
    history.push({
      pathname: "./employee",
      state: employeeId,
    });
  };

  //funcion para setear lenguaje
  const setLanguage = (lang) => {
    contextMiddleware.implementationLang(lang);
  };

  const logOut = () => {
    contextMiddleware.signOut();
    history.push("./home");
  };

  const createPost = () => {
    history.push("./newpost");
  };

  const correspo = () => {
    history.push("./correspondence");
  };

  const ticket = () => {
    return toast.error(
      "Lo sentimos por el momento esta opción esta deshabilita. Estamos trabajando en ello."
    );
    //history.push('./')
  };

  const training = () => {
    return toast.error(
      "Lo sentimos por el momento esta opción esta deshabilita. Estamos trabajando en ello."
    );
    //history.push('./')
  };

  const services = () => {
    return toast.error(
      "Lo sentimos por el momento esta opción esta deshabilita. Estamos trabajando en ello."
    );
    //history.push('./')
  };

  useEffect(() => {
    let unmounted = false;

    if (contextState.personId) {
      getOnePerson(contextState.token, contextState.personId)
        .then((res) => {
          if (res.status >= 400)
            throw new alert.err("error usuario incorrecto");
          return res.json();
        })
        .then((res) => {
          if (!unmounted) {
            //  setInterest(res.post);
            setPerson({
              personId: res.personId,
              fullName:
                res.firstName.split(" ", 1) + " " + res.lastName.split(" ", 1),
              position: res.position,
              birthday: res.birthday,
              photo: res.photo,
            });
          }
        })
        .catch((err) => {
          console.error(err.status);
        });
    }

    return () => {
      unmounted = true;
    };
  }, [contextState.token, contextState.personId]);

  return (
    <>
      <NavbarForm
        handeleLang={setLanguage}
        logOut={logOut}
        createPost={createPost}
        correspo={correspo}
        person={person}
        ticket={ticket}
        training={training}
        services={services}
        employeeProfile={employeeProfile}
      />
    </>
  );
};

export default Header;
