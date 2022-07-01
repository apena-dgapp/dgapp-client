import React, { useEffect, useContext, useState } from "react";
import EmployeeNewForm from "./EmployeeNewForm";
import { getAlldepartament } from "../../api/department";
import { getAllPersons, createPerson } from "../../api/person";
import GlobalContext from "../../context/GlobalContext";
import { getBase64 } from "../../utils/blobManager";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

function EmployeeNew() {
  const [contextState] = useContext(GlobalContext);
  const [departaments, setDepartaments] = useState("");
  const history = useHistory();
  const [person, setPerson] = useState("");
  const [photo, setPhoto] = useState("");
  const [screen, setScreen] = useState(1);
  const [departament, setDepartament] = useState("");
  const [reportTo, setReportTo] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    documentid: "",
    cel: "",
    date: "",
    career: "",
    code: "",
    position: "",
    startedon: "",
    phone: "",
    email: "",
    health: "",
  });

  const handlerInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlerdDepartament = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setDepartament(...departament, option);
  };

  const handlerdReportTo = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");
    setReportTo(...reportTo, option);
  };
  const seletedHandler = async (e) => {
    setPhoto(await getBase64(e.target.files[0]));
  };

  const removeImg = () => {
    setPhoto("");
  };

  const clearFormData = () => {
    setFormData({
      firstname: "",
      lastname: "",
      documentid: "",
      cel: "",
      date: "",
      career: "",
      code: "",
      position: "",
      startedon: "",
      phone: "",
      email: "",
      health: "",
    });
    setDepartament("");
    setReportTo("");
    setPhoto("");
  };

  const next = () => {
    if (
      // photo === "" &&
      formData.firstname === "" &&
      formData.lastname === "" &&
      formData.documentid === "" &&
      formData.cel === "" &&
      formData.date === ""
      // formData.career === ""
    ) {
      return toast.error(
        "Debes completar todos los campos antes de continuar requeridos"
      );
    } else {
      setScreen(2);
    }
  };

  const back = () => {
    setScreen(1);
  };

  const createHandlerForm = () => {
    if (
      formData.code === "" &&
      formData.position === "" &&
      departament === "" &&
      reportTo === "" &&
      formData.startedon === "" &&
      formData.phone === "" &&
      formData.email === "" &&
      formData.health === ""
    ) {
      return toast.error(
        "Debes completar todos los campos antes de continuar requeridos"
      );
    }
    console.log(formData);
    createPerson(
      contextState.token,
      formData.code,
      formData.firstname,
      formData.lastname,
      formData.documentid,
      formData.phone,
      formData.cel,
      formData.email,
      Number(departament),
      contextState.userName,
      "",
      photo,
      formData.date,
      formData.position,
      true,
      formData.career,
      reportTo,
      formData.startedon,
      formData.health
    )
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
        return res.json();
      })

      .then((res) => {
        console.log(res.status);
        toast.success("Nuevo Perfil de empleado creado!");
        clearFormData();
      })
      .catch((err) => {
        console.error(err.status);
      });
  };

  useEffect(() => {
    let unmounted = false;

    getAlldepartament(contextState.token)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
        return res.json();
      })

      .then((res) => {
        if (!unmounted) {
          setDepartaments(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    getAllPersons(contextState.token)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
        return res.json();
      })

      .then((res) => {
        if (!unmounted) {
          //   setPerson(res);
          setPerson(
            res?.filter((item) => item.personId !== contextState?.personId)
          );
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [contextState.token, contextState.personId]);

  return (
    <>
      <EmployeeNewForm
        departaments={departaments}
        handlerInputChange={handlerInputChange}
        formData={formData}
        person={person}
        seletedHandler={seletedHandler}
        photo={photo}
        removeImg={removeImg}
        createHandlerForm={createHandlerForm}
        handlerdDepartament={handlerdDepartament}
        handlerdReportTo={handlerdReportTo}
        next={next}
        back={back}
        screen={screen}
      />
    </>
  );
}

export default EmployeeNew;
