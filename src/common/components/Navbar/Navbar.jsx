import React, { useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import GlobalContext from "../../../context/GlobalContext";
import NavbarForm from "./NavbarForm";
import { getOnePerson } from "../../../api/person";
import { apiOneFile } from "../../../api/files";
// import io from "socket.io-client";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);

  //InitialState - ContexState
  const [contextState, , contextMiddleware] = useContext(GlobalContext);

  const [person, setPerson] = useState({
    personId: "",
    fullName: "",
    position: "",
    birthday: "",
    photo: "",
  });

  // const [file, setFile] = useState("");

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

  const home = () => {
    history.push("./home");
  };

  const logOut = () => {
    // socket.disconnect();
    contextMiddleware.signOut();
    contextMiddleware.setIsShowChat();
    history.push("./");
  };

  const createPost = () => {
    history.push("./newpost");
  };

  const inConstruction = () => {
    history.push("./building");
  };
  const allPost = () => {
    history.push("./allpost");
  };

  const employeedirectory = () => {
    history.push("./employeedirectory");
  };
  const employeeNew = () => {
    history.push("./employeenew");
  };

  const employeeTree = () => {
    history.push("./employeetree");
  };

  const training = () => {
    history.push("./training");
  };

  const register = () => {
    history.push("./register");
  };

  const goToFile = (name) => {
    apiOneFile(name)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        history.push({
          pathname: "./pdf",
          state: res[0].file,
        });
      })
      .catch((err) => {
        console.error(err.status);
      });
  };

  useEffect(() => {
    let unmounted = false;

    if (contextState.personId) {
      contextMiddleware.showSpinner(true);
      getOnePerson(contextState.personId)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (!unmounted) {
            setPerson({
              personId: res.personId,
              fullName:
                res.firstName.split(" ", 1) + " " + res.lastName.split(" ", 1),
              position: res.position,
              birthday: res.birthday,
              photo: res.photo,
            });
          }
          contextMiddleware.showSpinner(false);
        })
        .catch((err) => {
          console.error(err.status);
          contextMiddleware.showSpinner(false);
        });
    }

    if (!unmounted) {
      location.pathname !== `${process.env.REACT_APP_RUTE}` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/home` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/siglepost` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/allpost` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/userregister` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/newpost` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employee` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/aboutus` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeetree` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeeedit` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeenew` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/docdynamic` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeeprofile` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/chat` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employeedirectory` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/training` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/register`
        ? setIsHidden(true)
        : setIsHidden(false);
    }

    return () => {
      unmounted = true;
    };
  }, [contextState.personId, location.pathname]);

  return (
    <>
      <NavbarForm
        handeleLang={setLanguage}
        logOut={logOut}
        createPost={createPost}
        person={person}
        inConstruction={inConstruction}
        allPost={allPost}
        employeeProfile={employeeProfile}
        home={home}
        employeedirectory={employeedirectory}
        employeeNew={employeeNew}
        employeeTree={employeeTree}
        isHidden={isHidden}
        goToFile={goToFile}
        training={training}
        register={register}
      />
    </>
  );
};

export default Header;
