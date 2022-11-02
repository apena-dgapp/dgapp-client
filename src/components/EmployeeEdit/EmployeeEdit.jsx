import React, { useEffect, useState, useContext, useRef } from "react";
import EmployeeEditForm from "./EmployeeEditForm";
import { getAlldepartament } from "../../api/department";
import { getAllPersons, updatePerson } from "../../api/person";
import { getBase64 } from "../../utils/blobManager";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

function EmployeeEdit(props) {
  const [contextState] = useContext(GlobalContext);
  const [departaments, setDepartaments] = useState("");
  const history = useHistory();
  const [person, setPerson] = useState("");
  const [validateId, SetValidateId] = useState(false);
  const [photo, setPhoto] = useState("");
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

  const refInput = useRef();

  const clickRemove = () => {
    refInput.current.value = "";
    setPhoto("");
  };

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
            return toast.error("Número de cédula no valido!");
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
    // if (!photo && e.target.value !== null) {
    //   e.target.value = null;
    // }

    // console.log(photo);
  };

  // console.log(validateCode);

  const goToProfile = (id) => {
    history.push({
      pathname: "./perfil",
      state: id,
    });
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

  const updateHandlerForm = () => {
    const modifiedAt = new Date();

    if (formData.documentid) {
      if (!validateId) {
        return toast.error(
          "Por favor debes de digitar una CEDULA valida antes de continuar"
        );
      }
    }

    if (formData.documentid) {
      if (formData.documentid.length < 11) {
        return toast.error(
          "El Campo CÉDULA tiene que tener un mínimo de 11 caracteres"
        );
      }
    }

    if (formData.cel) {
      if (formData.cel.length < 10) {
        return toast.error(
          "El Campo CELULAR tiene que tener un mínimo de 10 caracteres"
        );
      }
    }

    if (formData.code) {
      const found = person.find(function(element) {
        return element.employeeCode === formData.code;
      });

      if (found) {
        return toast.error(
          `Este CÓDIGO actualmente pertenece a: ${found.lastName} ${found.firstName}`
        );
      }
    }

    if (formData.email) {
      var regex = /^[^\s@]+@DGAPP\.GOB\.DO$/;
      var result = regex.test(formData.email.toLocaleUpperCase());
      if (result !== true) {
        return toast.error(
          "Formato de EMAIL no valido, por favor de revisar antes de actualizar"
        );
      }
    }

    if (formData.email) {
      const found = person.find(function(element) {
        return element.email === formData.email.toLocaleUpperCase();
      });

      if (found) {
        return toast.error(
          `Este EMAIL actualmente pertenece a: ${found.lastName} ${found.firstName}`
        );
      }
    }

    if (
      photo === "" &&
      formData.firstname === "" &&
      formData.lastname === "" &&
      formData.documentid === "" &&
      formData.cel === "" &&
      formData.date === "" &&
      formData.career === "" &&
      formData.code === "" &&
      formData.position === "" &&
      departament === "" &&
      reportTo === "" &&
      formData.startedon === "" &&
      formData.phone === "" &&
      formData.email === "" &&
      formData.health === "" &&
      formData.blood === "" &&
      formData.emergencyname === "" &&
      formData.emergencynumber === "" &&
      formData.emergencyrelationship === "" &&
      formData.contracttype === "" &&
      formData.contractexpiration === ""
    ) {
      return toast.error("Por el momento no hay datos para actualizar");
    }

    updatePerson(
      props.location.state.personId,
      photo ? photo : props.location.state.photo,
      formData.firstname ? formData.firstname : props.location.state.firstName,
      formData.lastname ? formData.lastname : props.location.state.lastName,
      formData.documentid
        ? formData.documentid
        : props.location.state.documentId,
      formData.cel ? formData.cel : props.location.state.celNumber,
      formData.date ? formData.date : props.location.state.birthdayDate,
      formData.career ? formData.career : props.location.state.career,
      formData.code ? formData.code : props.location.state.employeeCode,
      formData.position ? formData.position : props.location.state.position,
      departament ? Number(departament) : props.location.state.departamentId,
      reportTo ? Number(reportTo) : props.location.state.reportsTo,
      formData.startedon ? formData.startedon : props.location.state.startedOn,
      formData.phone ? formData.phone : props.location.state.phoneNumber,
      formData.email
        ? formData.email.toUpperCase()
        : props.location.state.email.toUpperCase(),
      formData.health ? formData.health : props.location.state.healthInsurance,
      contextState.userName,
      modifiedAt,
      formData.blood ? formData.blood : props.location.state.bloodType,
      formData.emergencyname
        ? formData.emergencyname
        : props.location.state.emergencyName,
      formData.emergencynumber
        ? formData.emergencynumber
        : props.location.state.emergencyNumber,
      formData.emergencyrelationship
        ? formData.emergencyrelationship
        : props.location.state.emergencyRelationship,
      formData.contracttype
        ? formData.contracttype
        : props.location.state.contractType,
      formData.contractexpiration
        ? formData.contractexpiration
        : props.location.state.contractExpiration
    )
      .then((res) => {
        if (res.status === 500) {
          return toast.error("Error en el Servidor!");
        } else {
          toast.success("Perfil de empleado actualizado!");
          goToProfile(props.location.state.personId);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
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
          setPerson(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <EmployeeEditForm
        profile={props.location.state}
        departaments={departaments}
        handlerInputChange={handlerInputChange}
        formData={formData}
        person={person}
        seletedHandler={seletedHandler}
        photo={photo}
        updateHandlerForm={updateHandlerForm}
        handlerdDepartament={handlerdDepartament}
        handlerdReportTo={handlerdReportTo}
        clearFormData={clearFormData}
        validateId={validateId}
        refInput={refInput}
        clickRemove={clickRemove}
      />
    </>
  );
}

export default EmployeeEdit;
