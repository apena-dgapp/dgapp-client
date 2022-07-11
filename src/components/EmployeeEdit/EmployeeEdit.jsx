import React, { useEffect, useState, useContext } from "react";
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
  const goToProfile = (id) => {
    history.push({
      pathname: "./employeeprofile",
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
      return toast.error("Por el momento no hay datos para actulizar");
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
          toast.success("Perfil de empleado actulizado!");
          goToProfile(props.location.state.personId);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  };

  useEffect(() => {
    let unmounted = false;

    // const arroba = formData.email.includes("@");

    // if(arroba){
    //   setFormData({
    //     email:{...formData.email, "DGAPP.COM"}
    //   })
    // }

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
        removeImg={removeImg}
        updateHandlerForm={updateHandlerForm}
        handlerdDepartament={handlerdDepartament}
        handlerdReportTo={handlerdReportTo}
        clearFormData={clearFormData}
      />
    </>
  );
}

export default EmployeeEdit;
