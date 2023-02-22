import React, { useContext, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalContext from "../../../context/GlobalContext";
import NavbarForm from "../Navbar/NavbarForm";
import { getOnePerson } from "../../../api/person";
import useScreenSize from "../../../hooks/useScreenSize";
import NewQuiz from './NewQuiz'
import { newQuiz } from '../../../api/quiz.js'
import { validationNotices } from '../../../api/post'
import toast from "react-hot-toast";

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

  const refInitial = useRef();

  const initialDate = () => {
    refInitial.current.type = "date";
  };

  const initialText = () => {
    refInitial.current.type = "text";
  };

  const refExpiration = useRef();

  const expirationDate = () => {
    refExpiration.current.type = "date";
  };

  const expirationText = () => {
    refExpiration.current.type = "text";
  };

  const [modalActive, setModalActive] = useState(false);
  const [answer, setAnswer] = useState([1, 2]);
  const [formData, setFormData] = useState({
    question: "",
    answers: [],
    initial: "",
    expiration: ""
  });

  const modalToggle = () => {
    setModalActive(!modalActive);
    if (modalActive) {
      setAnswer([1, 2]);
      setFormData({
        question: "",
        answers: [],
        initial: "",
        expiration: ""
      });
    }
  };

  const modalInputChange = (e, index) => {
    if (e.target.name === "answers") {
      let temp = formData.answers;
      temp[index] = e.target.value;
      setFormData({
        ...formData,
        [e.target.name]: temp,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }

  };

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

  const news = () => {

    if (active === "menu_items_show") {
      setActive("menu_items");
    }

    if (show === "menu_hiden_show") {
      setShow("menu_hiden");
    }

    navigate("/publicaciones/noticias/pagina/1", { state: { category: "Noticia" } });
  };

  const multimedia = () => {
    navigate("/publicaciones/multimedia/menu");
  };

  const employeedirectory = () => {
    navigate("/directorio/pagina/1");
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

  const addAnswer = () => {
    if (answer.length < 4) setAnswer(answer => [...answer, answer.length + 1])
  }

  const RemoveAnswer = (e) => {
    var array = [...answer];
    var array2 = [...formData.answers];
    var index = array.indexOf(e)
    if (index !== -1) {
      array.splice(index, 1);
      array2.splice(index, 1);
      setAnswer(array);
      setFormData({
        question: formData.question,
        answers: array2
      })
    }
  }

  const sendQuiz = () => {

    if (formData.question === "") {
      return toast.error("Por favor agregar una pregunta");
    } else if (formData.answers.length < 2) {
      return toast.error("Por favor agregar mínimo dos respuestas");
    } else if (formData.initial === "") {
      return toast.error("Por favor agregar una fecha inicial");
    } else if (formData.expiration === "") {
      return toast.error("Por favor agregar una fecha de caducidad");
    } else if (formData.expiration <= formData.initial) {
      return toast.error("La fecha de caducidad no puede ser igual ni menor a la fecha inicial");
    }

    validationNotices(formData.initial)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== null) {
          return toast.error(`Fecha no disponible. Actualmente hay un aviso con esta fecha.
         EL AVISO EXPIRA: ${res?.expirationDate}`);
        } else {
          newQuiz(formData.question, formData.answers[0], formData.answers[1], formData.answers[2] ? formData.answers[2] : "",
            formData.answers[3] ? formData.answers[3] : "", person.fullName, formData.initial, formData.expiration)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              if (res === 200) {
                toast.success("La encuesta fue creada exitosamente!");
                modalToggle();
              } else {
                toast.error("Error al intentar crear la encuesta!");
              }
            })
            .catch((err) => {
              toast.error("Error del servidor");
              console.error(err.status);
            });
        }
      })
  }

  return (
    <>
      <NewQuiz
        modalToggle={modalToggle}
        modalActive={modalActive}
        formData={formData}
        modalInputChange={modalInputChange}
        answer={answer}
        addAnswer={addAnswer}
        RemoveAnswer={RemoveAnswer}
        sendQuiz={sendQuiz}
        refInitial={refInitial}
        initialDate={initialDate}
        initialText={initialText}
        refExpiration={refExpiration}
        expirationDate={expirationDate}
        expirationText={expirationText}
      />
      <NavbarForm
        logOut={logOut}
        createPost={createPost}
        person={person}
        inConstruction={inConstruction}
        news={news}
        employeeProfile={employeeProfile}
        home={home}
        employeedirectory={employeedirectory}
        employeeNew={employeeNew}
        employeeTree={employeeTree}
        isHidden={isHidden}
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
        modalToggle={modalToggle}
        multimedia={multimedia}
      />
    </>
  );
};

export default Navbar;
