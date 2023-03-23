import React, { useContext, useState, useEffect } from "react";
import Images from "../../common/images/index";
import { MdEmail, MdPhoneInTalk, MdCircle, MdSmartphone } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import GlobalContext from "../../context/GlobalContext";
import { getPhotos } from "../../api/person";

const CardForm = (props) => {
  const [contextState] = useContext(GlobalContext);
  const [photo, setPhoto] = useState([]);

  const id = props.id;

  useEffect(() => {

    let unmounted = false;

    if (!unmounted) {
      getPhotos(id)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setPhoto(res);

        })
        .catch((err) => {
          console.error(err.status);
        });
    }

    return () => {
      unmounted = true;
    };
  }, [id]);

  var birthdayMonth = new Intl.DateTimeFormat("es-ES", {
    month: "long",
  }).format(new Date(props.birthday));

  if (props.birthday) {
    var day = props.birthday.split("-");
    var daySplit = day[2];
    const currentDay = `${new Date().getFullYear()}-${new Date().getMonth() + 1
      }-${daySplit}`;
    const fechaComoCadena = currentDay; // día lunes
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const numeroDia = new Date(fechaComoCadena).getDay();
    var nombreDia = dias[numeroDia];
  }

  return (
    <>
      <div className="emDirectory-card">
        <div className="emDirectory-card-cont">
          {
            !props.isActive && (contextState.userRole === 1 || contextState.personId === 2 || contextState.personId === 88) ? (
              <div className="d-flex mt-1">
                <p style={{ fontWeight: "bold", color: "red" }}>Desactivado</p>
                <i className="md md-phone-in-talk" />
                <MdCircle
                  style={{ marginTop: "0.3rem" }}
                  size="1rem"
                  color="red"
                />
              </div>
            ) : (props.isVacation ? <div className="d-flex mt-1">
              <p style={{ fontWeight: "bold", color: "#F7C04A" }}>Vacaciones</p>
              <i className="md md-phone-in-talk" />
              <MdCircle
                style={{ marginTop: "0.3rem" }}
                size="1rem"
                color="#F7C04A"
              />
            </div> : props.isActive && (contextState.userRole === 1 || contextState.personId === 2 || contextState.personId === 88) ? (
              <div className="d-flex mt-1">
                <p style={{ fontWeight: "bold", color: "#75AAD3" }}>Activo</p>
                <i className="md md-phone-in-talk" />
                <MdCircle
                  style={{ marginTop: "0.3rem" }}
                  size="1rem"
                  color="#75AAD3"
                />
              </div>
            ) : <div style={{ width: "100%", height: "2.46rem", marginTop: "0.3rem" }}></div>)}

          <img
            src={photo?.photo ? photo?.photo : Images.noImg}
            className="emDirectory-card-img"
            alt="..."
            onClick={() => contextState.userRole === 1 || contextState.personId === 2 || contextState.personId === 88 || props.id === contextState.personId ?
              props.goToProfile({ id: props.id, name: props?.name }) : null}
          />
          <div className="card-body">
            <p className="emDirectory-card-departament">
              {props.departament ? props.departament : ""}
            </p>
            <h5 className="emDirectory-card-name">
              {props.name ? props.name : ""}
            </h5>
            <p className="emDirectory-card-position">
              {props.position ? props.position : ""}
            </p>
          </div>
          <div className="emDirectory-card-inf">
            {
              props.birthday ? <p className="emDirectory-card-text-contact">
                <i className="md md-phone-in-talk" />
                <FaBirthdayCake
                  style={{ marginRight: "0.5rem" }}
                  size="1.5em"
                  color="#8CB2C4"
                />
                {nombreDia} {daySplit} de {birthdayMonth}
              </p> : null
            }
          </div>
          <div className="emDirectory-card-inf">
            {
              props.cel ? <p className="emDirectory-card-text-contact">
                <i className="md md-smart-phone" />
                <MdSmartphone
                  style={{ marginRight: "0.5rem" }}
                  size="1.5em"
                  color="#8CB2C4"
                />
                {props.cel}
              </p> : null
            }
            {
              props.phone ? <p className="emDirectory-card-text-contact">
                <i className="md md-phone-in-talk" />
                <MdPhoneInTalk
                  style={{ marginRight: "0.5rem" }}
                  size="1.5em"
                  color="#8CB2C4"
                />
                {props.phone}
              </p> : null
            }
          </div>
          {/* <div className="mb-2">
            {
              props.cel ? <p className="emDirectory-card-text-contact">
                <i className="md md-smart-phone" />
                <MdSmartphone
                  style={{ marginRight: "0.5rem" }}
                  size="1.5em"
                  color="#8CB2C4"
                />
                {props.cel}
              </p> : null
            }
          </div> */}

          <div className="emDirectory-card-inf">
            {
              props.email ? <p className="emDirectory-card-text-contact">
                <i className="md md-Email" />
                <MdEmail
                  style={{ marginRight: "0.5rem" }}
                  size="1.5em"
                  color="#8CB2C4"
                />
                {props.email}
              </p> : null
            }
          </div>
          {contextState.userRole === 1 || contextState.personId === 2 || contextState.personId === 88 || props.id === contextState.personId ?
            <button
              onClick={() => props.goToProfile({ id: props.id, name: props?.name })}
              className="emDirectory-card-btn"
            >
              Ir al Perfil
            </button> : <div style={{ color: "#113250" }} className="emDirectory-card-btn">-</div>}
        </div>
      </div>
    </>
  );
};

export default CardForm;
