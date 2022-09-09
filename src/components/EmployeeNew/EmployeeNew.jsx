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
  const [contextState, , contextMiddleware] = useContext(GlobalContext);
  const [departaments, setDepartaments] = useState("");
  const [email, setEmail] = useState("");
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
    if (
      // photo === "" &&
      formData.firstname === "" ||
      formData.firstname === undefined ||
      formData.lastname === "" ||
      formData.lastname === undefined ||
      formData.documentid === "" ||
      formData.documentid === undefined ||
      formData.cel === "" ||
      formData.cel === undefined ||
      formData.date === "" ||
      formData.date === undefined
      // formData.career === ""
    ) {
      return toast.error(
        "Debes completar todos los campos antes de continuar requeridos"
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
    if (
      code === "" ||
      code === undefined ||
      formData.position === "" ||
      formData.position === undefined ||
      departament === "" ||
      departament === undefined ||
      reportTo === "" ||
      reportTo === undefined ||
      formData.startedon === "" ||
      formData.startedon === undefined ||
      // formData.phone === "" &&
      email === "" ||
      email === undefined ||
      formData.contracttype === "" ||
      formData.contracttype === undefined
      // formData.health === ""
    ) {
      return toast.error(
        "Debes completar todos los campos antes de continuar requeridos"
      );
    } else {
      if (formData.date) {
        contextMiddleware.showSpinner(true);
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
          formatDate(formData.contractexpiration)
            ? formatDate(formData.contractexpiration)
            : null
        )
          .then((res) => {
            if (res.status === 500) {
              contextMiddleware.showSpinner(false);
              return toast.error("Error en el Servidor!");
            } else {
              contextMiddleware.showSpinner(false);
              toast.success("Nuevo Perfil de empleado creado!");
              clearFormData();
              back();
            }
          })
          .catch((err) => {
            contextMiddleware.showSpinner(false);
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
        // departament={departament}
      />
    </>
  );
}

export default EmployeeNew;
