import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalContext from "../../../context/GlobalContext";
import NavbarForm from "./NavbarForm";
import { getOnePerson } from "../../../api/person";
import { apiOneFile } from "../../../api/files";
import useScreenSize from "../../../hooks/useScreenSize";
// import io from "socket.io-client";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [active, setActive] = useState("menu_items");
  const [show, setShow] = useState("menu_hiden");
  const [action, setAction] = useState("");
  const {width, height} = useScreenSize();

  const navToggle = () => {

    if(show === "menu_hiden_show"){
      setShow("menu_hiden");
    }

    if(show === "menu_hiden_show"){
      setShow("menu_hiden");
    }

    active === "menu_items"
      ? setActive("menu_items_show")
      : setActive("menu_items");
  };

  const hidenToggle = (action) => {
    setAction(action);
    show === "menu_hiden"
      ? setShow("menu_hiden_show")
      : setShow("menu_hiden");
  };

  //InitialState - ContexState
  const [contextState, , contextMiddleware] = useContext(GlobalContext);

  const [person, setPerson] = useState({
    personId: "",
    fullName: "",
    position: "",
    birthday: "",
    photo: "",
  });

  const aboutUSChange = (e, name) => {
    e.preventDefault();

    if(active === "menu_items_show"){
      setActive("menu_items");
    }
    
    navigate(`/nosotros/${name}`,{state: name,});
  };

  // const [file, setFile] = useState("");

  const employeeProfile = (e) => {
    if(active === "menu_items_show"){
      setActive("menu_items");
    }
    if(active === "menu_items_show"){
      setActive("menu_items");
    }

    const employeeId = e.currentTarget.id;
    navigate(`/perfil/yo`,{state: employeeId,});
  };

  //funcion para setear lenguaje
  // const setLanguage = (lang) => {
  //   contextMiddleware.implementationLang(lang);
  // };

  const home = () => {

    if(active === "menu_items_show"){
      setActive("menu_items");
    }

    navigate("/inicio");
  };

  const logOut = () => {
    // socket.disconnect();
    contextMiddleware.signOut();
    navigate("./");
    localStorage.clear();
    // contextMiddleware.setIsShowChat();
    
    // window.localStorage.clear();

    // console.log(contextState.token);
    // console.log(localStorage);
  };

  const createPost = () => {
    navigate("/crear-entrada");
  };

  const inConstruction = () => {

    if(active === "menu_items_show"){
      setActive("menu_items");
    }

    if(show === "menu_hiden_show"){
      setShow("menu_hiden");
    }

    navigate("/construccion");
  };

  const allPost = () => {

    if(active === "menu_items_show"){
      setActive("menu_items");
    }

    if(show === "menu_hiden_show"){
      setShow("menu_hiden");
    }

    navigate("/noticias",{state:{category: "Noticia"}});  
  };

  const employeedirectory = () => {
    navigate("/directorio");
  };
  const employeeNew = () => {
    navigate("/nuevo-empleado");
  };

  const employeeTree = () => {
    navigate("/organigrama");
  };

  const training = () => {

    if(active === "menu_items_show"){
      setActive("menu_items");
    }
    
    navigate("/entrenamiento");
  };

  const createEvents = () => {
    navigate("/crear-evento");
  };

  const register = () => {
    navigate("/registrar");
  };

  const foodOrder = () => {
    navigate("/foodorder");
  };

  const ticketSystem = () => {

    if(active === "menu_items_show"){
      setActive("menu_items");
    }

    navigate("/ticket");
  };

  const goToFile = (name) => {
    apiOneFile(name)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        navigate("/pdf",{state: res[0].file,});
      })
      .catch((err) => {
        console.error(err.status);
      });
  };

  useEffect(() => {
    let unmounted = false;

    if (contextState.personId) {
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
        })
        .catch((err) => {
          logOut();
          console.error(err.status);
        });
    }

    if (!unmounted) {
        location.pathname === `${process.env.REACT_APP_RUTE}/pdf` 
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
        // handeleLang={setLanguage}
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
        createEvents={createEvents}
        foodOrder={foodOrder}
        ticketSystem={ticketSystem}
        aboutUSChange={aboutUSChange}
        active={active}
        navToggle={navToggle}
        show={show}
        hidenToggle={hidenToggle}
        action={action}
        width={width}
      />
    </>
  );
};

export default Navbar;
