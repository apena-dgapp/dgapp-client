import React, { useEffect, useState, useContext } from "react";
import EmployeeForm from "./EmployeeForm";
import { getOnePerson, isActivePerson } from "../../api/person";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";  
import GlobalContext from "../../context/GlobalContext";
import ClipLoader from "react-spinners/ClipLoader";

const Employee = () => {
  const [contextState] = useContext(GlobalContext);
  const [profile, setProfile] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state ? location.state : contextState.personId;
  const [loading, seLoading] = useState(false);

  useEffect(() => {
    seLoading(true);
    setTimeout(() => {
      seLoading(false);
    }, 2000);
  }, []);

  const msgDisable = () => {
    return toast.error(
      "Lo sentimos, por el momento esta opción está deshabilita. Estamos trabajando en ello."
    );
  };

  const edit = () => {
    const reportName = {
      reportname: reportsTo?.firstName + " " + reportsTo?.lastName,
    };

    const newProfile = Object.assign(profile, reportName);
    navigate(`/perfil/editar/${profile.firstName.split(" ")[0] + " " + profile.lastName.split(" ")[0]}`,{
      state: newProfile,
    });
  };

  const goTodocuments = (title) => {
    const state = Object.assign({id}, {title});
    navigate(`/perfil/documentos/${profile.firstName.split(" ")[0] + " " + profile.lastName.split(" ")[0]}`,{
      state: state,
    });
  };

  useEffect(() => {
    let unmounted = false;

    getOnePerson(id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setProfile(res);
          getOnePerson(res.reportsTo)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              if (!unmounted) {
                setReportsTo(res);
              }
            })
            .catch((err) => {
              console.error(err.status);
            });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [id]);
  
  const handleIsActive = (e) => {
    const isActive = e.target.checked;
    const modifiedAt = new Date();
    isActivePerson(id, isActive, contextState.userName, modifiedAt)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(err.status);
      });
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
        <EmployeeForm
          reportsTo={reportsTo}
          profile={profile}
          msgDisable={msgDisable}
          edit={edit}
          handleIsActive={handleIsActive}
          goTodocuments={goTodocuments}
        />
      )}
    </>
  );
};

export default Employee;
