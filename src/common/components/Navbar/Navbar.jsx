import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalContext from "../../../context/GlobalContext";
import NavbarForm from "./NavbarForm";
import { getOnePerson } from "../../../api/person";
import useScreenSize from "../../../hooks/useScreenSize";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [active, setActive] = useState("menu_items");
  const [show, setShow] = useState("menu_hiden");
  const [action, setAction] = useState("");
  const { width } = useScreenSize();
  const [contextState, , contextMiddleware] = useContext(GlobalContext);
  const [person, setPerson] = useState({
    personId: "",
    fullName: "",
    position: "",
    birthday: "",
    photo: "",
    email: "",
    departament: "",
    documentId: "",
    reportsTo: "",
    startedOn: ""
  });

  const navToggle = () => {

    if (show === "menu_hiden_show") {
      setShow("menu_hiden");
    }

    if (show === "menu_hiden_show") {
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

  const aboutUSChange = (e, name) => {
    e.preventDefault();

    if (active === "menu_items_show") {
      setActive("menu_items");
    }

    navigate(`/nosotros/${name}`, { state: name, });
  };

  const employeeProfile = (e) => {
    if (active === "menu_items_show") {
      setActive("menu_items");
    }
    if (active === "menu_items_show") {
      setActive("menu_items");
    }

    const employeeId = e.currentTarget.id;
    navigate(`/perfil/yo`, { state: employeeId, });
  };

  const home = () => {

    if (active === "menu_items_show") {
      setActive("menu_items");
    }
    navigate("/inicio");
  };

  const logOut = useCallback(() => {
    contextMiddleware.signOut();
    navigate("./");
    localStorage.clear();
  }, [contextMiddleware, navigate]);

  const createPost = () => {
    navigate("/administracion/crear-entrada", {
      state: person
    });
  };

  const inConstruction = () => {

    if (active === "menu_items_show") {
      setActive("menu_items");
    }

    if (show === "menu_hiden_show") {
      setShow("menu_hiden");
    }

    navigate("/construccion");
  };

  const allPost = () => {

    if (active === "menu_items_show") {
      setActive("menu_items");
    }

    if (show === "menu_hiden_show") {
      setShow("menu_hiden");
    }

    navigate("/publicaciones/noticias", { state: { category: "Noticia" } });
  };

  const employeedirectory = () => {
    navigate("/directorio");
  };
  const employeeNew = () => {
    navigate("/administracion/nuevo-empleado");
  };

  const employeeTree = () => {
    navigate("/organigrama");
  };

  const training = () => {

    if (active === "menu_items_show") {
      setActive("menu_items");
    }

    navigate("/entrenamiento");
  };

  const createEvents = () => {
    navigate("/administracion/crear-evento");
  };

  const register = () => {
    navigate("/administracion/registrar");
  };

  const foodOrder = () => {
    navigate("/foodorder");
  };

  const ticketSystem = (action) => {

    const state = Object.assign({ action }, person);

    if (active === "menu_items_show") {
      setActive("menu_items");
    }

    navigate(`/servicios/tecnologia/ticket/${action}`, {
      state: state
    });

  };

  const formTemple = (module) => {
    navigate(`/servicios/recursoshumanos/solicitudes/${module}`);
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
              birthday: res.birthdayDate,
              photo: res.photo,
              email: res.email,
              departament: res.Departament.name,
              documentId: res.documentId,
              reportsTo: res.reportsTo,
              startedOn: res.startedOn
            });
          }
        })
        .catch((err) => {
          logOut()
          console.error(err.status);
        });
    }

    if (!unmounted) {
      location.pathname === `/pdf`
        ? setIsHidden(true)
        : setIsHidden(false);
    }

    return () => {
      unmounted = true;
    };
  }, [contextState.personId, location.pathname, logOut]);

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
        // goToFile={goToFile}
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
        formTemple={formTemple}
      />
    </>
  );
};

export default Navbar;
