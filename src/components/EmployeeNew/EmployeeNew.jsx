import React, { useEffect, useContext, useState } from "react";
import EmployeeNewForm from "./EmployeeNewForm";
import { getAlldepartament } from "../../api/department";
import {
  getAllPersons,
  createPerson,
  validationDocument,
} from "../../api/person";
import GlobalContext from "../../context/GlobalContext";
import { getBase64 } from "../../utils/blobManager";
import toast from "react-hot-toast";

function EmployeeNew() {
  const [contextState] = useContext(GlobalContext);
  const [departaments, setDepartaments] = useState("");
  const [email, setEmail] = useState("");
  const [validateId, SetValidateId] = useState(false);
  const [code, setCode] = useState("");
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
    blood: "",
    emergencyname: "",
    emergencynumber: "",
    emergencyrelationship: "",
    contracttype: "",
    contractexpiration: "",
  });

  const handlerInputChange = (e) => {
    if (e.target.name === "documentid" && e.target.value.length > 10) {
      fetch(
        `https://api.digital.gob.do/v3/cedulas/${e.target.value}/validate`,
        {
          accept: "application/json",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.valid) {
            SetValidateId(true);
          } else {
            SetValidateId(false);
            return toast.error("Numero de cedula no valido!");
          }
        });
    }

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
      blood: "",
      emergencyname: "",
      emergencynumber: "",
      emergencyrelationship: "",
      contracttype: "",
      contractexpiration: "",
    });
    setDepartament("");
    setReportTo("");
    setPhoto("");
  };

  const next = () => {
    if (formData.firstname === "" || formData.firstname === undefined) {
      return toast.error(
        "Por favor de llenar el campo NOMBRE antes de continuar"
      );
    } else if (formData.lastname === "" || formData.lastname === undefined) {
      return toast.error(
        "Por favor de llenar el campo APELLIDO antes de continuar"
      );
    } else if (
      formData.documentid === "" ||
      formData.documentid === undefined
    ) {
      return toast.error(
        "Por favor de llenar el campo CEDULA antes de continuar"
      );
    } else if (!validateId) {
      return toast.error(
        "Por favor debes de digitar una CEDULA valida antes de continuar"
      );
    } else if (formData.documentid.length < 11) {
      return toast.error(
        "El Campo CEDULA tiene que tener un minimo de 11 caracteres"
      );
    } else if (formData.cel === "" || formData.cel === undefined) {
      return toast.error(
        "Por favor de llenar el campo CELULAR antes de continuar"
      );
    } else if (formData.cel.length < 10) {
      return toast.error(
        "El Campo CELULAR tiene que tener un minimo de 10 caracteres"
      );
    } else if (formData.date === "" || formData.date === undefined) {
      return toast.error(
        "Por favor de llenar el campo FECHA DE NACIMIENTO antes de continuar"
      );
    } else {
      if (formData?.documentid) {
        validationDocument(formData?.documentid)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res) {
              return toast.error("Este numero de cedula ya esta en el sistema");
            } else {
              setEmail(
                formData.firstname.split("")[0].toUpperCase() +
                  formData.lastname.split(" ")[0].toUpperCase() +
                  "@DGAPP.GOB.DO"
              );
              setScreen(2);
            }
          })
          .catch((err) => {
            console.error(err.status);
          });
      }
    }
  };

  const back = () => {
    setScreen(1);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const createHandlerForm = () => {
    if (formData.position === "" || formData.position === undefined) {
      return toast.error(
        "Por favor de llenar el campo POSICION antes de crear un nuevo empleado"
      );
    } else if (departament === "" || departament === undefined) {
      return toast.error(
        "Por favor de llenar el campo DEPARTAMENTO antes de crear un nuevo empleado"
      );
    } else if (reportTo === "" || reportTo === undefined) {
      return toast.error(
        "Por favor de llenar el campo SE REPORTA antes de crear un nuevo empleado"
      );
    } else if (formData.startedon === "" || formData.startedon === undefined) {
      return toast.error(
        "Por favor de llenar el campo INICIO LABORAL antes de crear un nuevo empleado"
      );
    } else if (email === "" || email === undefined) {
      return toast.error(
        "Por favor de llenar el campo EMAIL antes de crear un nuevo empleado"
      );
    } else if (
      formData.contracttype === "" ||
      formData.contracttype === undefined
    ) {
      return toast.error(
        "Por favor de llenar el campo TIPO DE CONTRATO antes de crear un nuevo empleado"
      );
    } else {
      if (formData.date) {
        createPerson(
          code,
          formData.firstname,
          formData.lastname,
          formData.documentid,
          formData.phone,
          formData.cel,
          email,
          Number(departament),
          contextState.userName,
          "",
          photo,
          formatDate(formData.date),
          formData.position,
          true,
          formData.career,
          reportTo,
          formatDate(formData.startedon),
          formData.health,
          formData.blood,
          formData.emergencyname,
          formData.emergencynumber,
          formData.emergencyrelationship,
          formData.contracttype,
          formData.contractexpiration
            ? formatDate(formData.contractexpiration)
            : null
        )
          .then((res) => {
            if (res.status === 500) {
              return toast.error("Error en el Servidor!");
            } else {
              toast.success("Nuevo Perfil de empleado creado!");
              clearFormData();
              back();
            }
          })
          .catch((err) => {
            console.error(err.status);
          });
      }
    }
  };
  useEffect(() => {
    let unmounted = false;

    getAlldepartament()
      .then((res) => {
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

    getAllPersons()
      .then((res) => {
        return res.json();
      })

      .then((res) => {
        if (!unmounted) {
          //   setPerson(res);
          setPerson(res?.filter((item) => item.personId));
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [contextState.personId]);

  return (
    <>
      <EmployeeNewForm
        departaments={departaments}
        handlerInputChange={handlerInputChange}
        formData={formData}
        setFormData={setFormData}
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
        setCode={setCode}
        code={code}
        setEmail={setEmail}
        email={email}
        validateId={validateId}
        // departament={departament}
      />
    </>
  );
}

export default EmployeeNew;
